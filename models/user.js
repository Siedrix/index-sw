const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')
const bcrypt = require('bcrypt')
const dataTables = require('mongoose-datatables')
const assert = require('http-assert')

const jwt = require('lib/jwt')

const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR)

const userSchema = new Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String, required: true, unique: true, trim: true },
  validEmail: {type: Boolean, default: false},

  screenName: { type: String, unique: true, required: true },
  displayName: { type: String },
  isAdmin: {type: Boolean, default: false},

  resetPasswordToken: { type: String, default: v4 },

  uuid: { type: String, default: v4 },
  apiToken: { type: String, default: v4 }
})

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toString()
  }

  if (this.email) {
    this.email = this.email.toLowerCase()
  }

  next()
})

userSchema.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) return next()

  try {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
    this.password = bcrypt.hashSync(this.password, salt)
  } catch (err) {
    return next(err)
  }

  return next()
})

// Methods
userSchema.methods.format = function () {
  return {
    uuid: this.uuid,
    screenName: this.screenName,
    displayName: this.displayName,
    email: this.email,
    validEmail: this.validEmail
  }
}

userSchema.methods.getJwt = function () {
  return jwt.sign({
    uuid: this.uuid,
    apiToken: this.apiToken
  })
}

userSchema.methods.toPublic = function () {
  return {
    uuid: this.uuid,
    screenName: this.screenName,
    displayName: this.displayName,
    name: this.name,
    validEmail: this.validEmail
  }
}

// Statics
userSchema.statics.auth = async function (email, password) {
  const userEmail = email.toLowerCase()
  const user = await this.findOne({email: userEmail})
  assert(user, 401, 'Invalid email/password')

  const isValid = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, compared) =>
      (err ? reject(err) : resolve(compared))
    )
  })
  assert(isValid, 401, 'Invalid email/password')

  return user
}

userSchema.statics.register = async function (options) {
  const {screenName, displayName, email, password} = options

  const emailTaken = await this.findOne({ email })
  assert(!emailTaken, 401, 'Email already in use')

  const screenTaken = await this.findOne({ screenName })
  assert(!screenTaken, 401, 'Username already taken')

  // create in mongoose
  const createdUser = await this.create({ screenName: screenName, displayName: displayName, email: email, password: password })

  return createdUser
}

userSchema.plugin(dataTables)

module.exports = mongoose.model('User', userSchema)
