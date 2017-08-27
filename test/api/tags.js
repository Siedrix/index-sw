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

async function createPost (user, tags) {
  const jwt = user.getJwt()

  await test()
    .post('/api/post')
    .send({
      url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
      description: 'This was useful',
      tags: tags
    })
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
}

describe('/post', () => {
  const password = '1234'
  beforeEach(async function () {
    await clearDatabase()
  })

  describe('[get] /api/user/:screenName get tags', () => {
    it('should return a post', async function () {
      const user = await createUser({ password })

      await createPost(user, ['foo', 'bar', 'quz'])
      await createPost(user, ['bar', 'biz'])
      await createPost(user, ['bar', 'biz'])

      const res = await test()
        .get(`/api/user/${user.screenName}`)
        .set('Accept', 'application/json')
        .expect(200)

      expect(res.body.screenName).equal(user.screenName)
      expect(res.body.tags[0].count).equal(3)
      expect(res.body.tags[0].slug).equal('bar')

      expect(res.body.tags[1].count).equal(2)
      expect(res.body.tags[1].slug).equal('biz')

      expect(res.body.tags[2].count).equal(1)
      expect(res.body.tags[2].slug).equal('foo')

      expect(res.body.tags[3].count).equal(1)
      expect(res.body.tags[3].slug).equal('quz')
    })
  })
})
