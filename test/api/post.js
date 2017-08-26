/* global describe, beforeEach, it */
require('co-mocha')

const { expect } = require('chai')
const http = require('http')
const { clearDatabase, createUser } = require('../utils')
const api = require('api/')
const request = require('supertest')

const {Post, Url} = require('models')

function test () {
  return request(http.createServer(api.callback()))
}

describe('/post', () => {
  const password = '1234'
  beforeEach(async function () {
    await clearDatabase()
  })

  describe('[post] / Create post', () => {
    it('should return a post', async function () {
      this.timeout(120000)
      const user = await createUser({ password })
      const jwt = user.getJwt()

      const res = await test()
        .post('/api/post')
        .send({
          url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
          description: 'This was useful'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)

      expect(typeof res.body.uuid).equal('string')
    })
  })

  describe('[post] / Create post with double url', () => {
    it('should return a post', async function () {
      const user = await createUser({ password })
      const jwt = user.getJwt()

      const res = await test()
        .post('/api/post')
        .send({
          url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
          description: 'This was useful'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)

      const res2 = await test()
        .post('/api/post')
        .send({
          url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
          description: 'This was really useful'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)

      expect(typeof res2.body.uuid).equal('string')

      expect(res.body.uuid === res2.body.uuid).equal(false)

      const postCount = await Post.count()
      expect(postCount).equal(2)

      const urlCount = await Url.count()
      expect(urlCount).equal(1)
    })
  })


  describe('[post] / List', () => {
    it('should return a list', async function () {
      const user = await createUser({ password })
      const jwt = user.getJwt()

      const res = await test()
        .post('/api/post')
        .send({
          url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
          description: 'This was useful'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)

      const res2 = await test()
        .post('/api/post')
        .send({
          url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
          description: 'This was really useful'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)


      const res3 = await test()
        .get('/api/post?user=User')
        .set('Accept', 'application/json')
        .expect(200)

      expect(res3.body.data.length === 2).equal(true)

      const res4 = await test()
        .get('/api/post')
        .set('Accept', 'application/json')
        .expect(200)

      expect(res4.body.data.length === 2).equal(true)

    })
  })

  describe.only('[post] / Single', () => {
    it('should return a post', async function () {
      const user = await createUser({ password })
      const jwt = user.getJwt()

      const res = await test()
        .post('/api/post')
        .send({
          url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
          description: 'This was useful'
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)


      const res3 = await test()
        .get('/api/post/' + res.body.uuid)
        .set('Accept', 'application/json')
        .expect(200)

      console.log(res3.body)

      expect(res3.body.uuid === res.body.uuid).equal(true)
    })
  })


})
