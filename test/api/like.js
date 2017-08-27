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

  return await test()
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

async function createPostLike (user, uuid) {
  const jwt = user.getJwt()

  return await test()
    .post('/api/like')
    .send({
      post: uuid
    })
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
}

describe('/like', () => {
  const password = '1234'
  beforeEach(async function () {
    await clearDatabase()
  })

  describe('[post] /api/like', () => {
    it.only('should return a like', async function () {
      const user = await createUser({ password })

      const postRes = await createPost(user, ['foo', 'bar', 'quz'])
      const likeRes = await createPostLike(user, postRes)

    })
  })

})
