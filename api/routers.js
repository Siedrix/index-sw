const Joi = require('joi')
const requireindex = require('es6-requireindex')
const path = require('path')
const debug = require('debug')
const router = require('koa-router')
const { forEach } = require('lodash')

const resouces = requireindex(path.join(__dirname, 'routers'), { recursive: false })

module.exports = function api (app) {
  forEach(resouces, ({ prefix, routes, middlewares }) => {
    const pfix = `/api${prefix}`
    const rtr = router()
    rtr.prefix(pfix)

    debug('api')(`Adding resource ${pfix}`)
    forEach(middlewares, mdw => {
      rtr.use(mdw)
    })

    forEach(routes, route => {
      debug('api')(`Added new route [${route.method}]${pfix}${route.path}`)

      rtr[route.method](route.path, async function (ctx) {
        if (route.validator) {
          const result = Joi.validate(ctx.request.body, route.validator)

          if (result.error) {
            return ctx.throw(422, result.error.message)
          }
        }

        await route.handler(ctx)
      })
    })

    app.use(rtr.middleware())
  })
}
