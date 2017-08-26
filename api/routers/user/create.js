const Joi = require('joi')
const jwt = require('lib/jwt')

const {User} = require('models')

module.exports = {
  method: 'post',
  path: '/',
  validator: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    screenName: Joi.string().required(),
    displayName: Joi.string()
  }),
  handler: async function (ctx) {
    const { screenName, displayName, email, password } = ctx.request.body
    const user = await User.register({
      screenName,
      displayName,
      email,
      password
    })

    // await user.sendValidationEmail()

    ctx.body = {
      user: user.format(),
      jwt: jwt.sign({
        uuid: user.uuid,
        apiToken: user.apiToken
      })
    }
  }
}
