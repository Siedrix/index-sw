import request from 'superagent'
import _ from 'lodash'

const timeout = 30 * 1000 // 30 minutes

export default function (method, headers = {}, url, data) {
  return new Promise((resolve, reject) => {
    const req = request[method](url)

    _.each(headers, (value, key) => {
      req.set(key, value)
    })

    if (method === 'post' || method === 'put') {
      req.send(data)
    }

    req.timeout(timeout)

    req.end((err, res) => {
      if (!err && res.status === 200) {
        return resolve(res.body)
      }

      const e = {
        error: res ? res.status : 500,
        message: res ? res.text : err.message
      }

      return reject(e)
    })
  })
}
