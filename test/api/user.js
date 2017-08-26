/* global describe, beforeEach, it */
require('co-mocha')

const { expect } = require('chai')
const http = require('http')
const { clearDatabase, createUser } = require('../utils')
const api = require('api/')
const request = require('supertest')

function test () {
  return request(http.createServer(api.callback()))
}

describe('/user', () => {
  const password = '1234'

  beforeEach(async function () {
    await clearDatabase()
  })

  describe('[post] / Create user', () => {
    it('should return a error', async function () {
      await test()
        .post('/api/user')
        .send()
        .set('Accept', 'application/json')
        .expect(422)
    })

    it('should return a 200 with user and jwt', async function () {
      const email = 'app@user.com'
      const res = await test()
        .post('/api/user')
        .send({
          password: '4321',
          email: email,
          displayName: 'App User',
          screenName: 'au'
        })
        .set('Accept', 'application/json')
        .expect(200)

      expect(res.body.user.email).equal(email)
      expect(res.body.user.uuid).to.have.lengthOf(36)
      expect(typeof res.body.jwt).equal('string')
    })
  })

  describe('[post] /login', () => {
    it('should return a error', async function () {
      const user = await createUser({ password })

      await test()
        .post('/api/user/login')
        .send({ password: '4321', email: user.email })
        .set('Accept', 'application/json')
        .expect(401)
    })

    it('should create a session', async function () {
      const user = await createUser({ password })

      const res = await test()
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({ password, email: user.email })
        .expect(200)

      expect(res.body.user.email).equal(user.email)
    })
  })

  describe('[get] /me Gets jwt user data', () => {
    it('should return a 200 with loggedIn false', async function () {
      const res = await test()
        .get('/api/user/me')
        .set('Accept', 'application/json')
        .expect(200)

      expect(res.body.loggedIn).equal(false)
    })

    it('should return user data', async function () {
      const user = await createUser({ password })
      const jwt = user.getJwt()

      const res = await test()
        .get('/api/user/me')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)

      expect(res.body.loggedIn).equal(true)
    })

    it('should return 401 for invalid jwt', async function () {
      await test()
        .get('/api/user/me')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer Invalid`)
        .expect(401)
    })

    it('should return 401 for invalid user', async function () {
      const user = await createUser({ password })
      user.uuid = 'Invalid'
      const jwt = user.getJwt()

      await test()
        .get('/api/user/me')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(401)
    })
  })
})
