import qs from 'qs'

import request from './request'
import envVars from './env-variables'
import tree from './tree'

export default {
  get (endpoint, data) {
    return this.request('get', endpoint, data)
  },

  post (endpoint, data) {
    return this.request('post', endpoint, data)
  },

  put (endpoint, data) {
    return this.request('put', endpoint, data)
  },

  del (endpoint, data) {
    return this.request('del', endpoint, data)
  },

  request (method, endpoint, data) {
    let url = `${envVars.API_HOST}/api${endpoint}`

    const headers = {
      'Accept': 'application/json'
    }

    if (tree.get('jwt')) {
      headers['Authorization'] = `Bearer ${tree.get('jwt')}`
    }

    if (method === 'get') {
      url += `?${qs.stringify(data)}`
      return request('get', headers, url)
    } else {
      return request(method, headers, url, data)
    }
  }
}
