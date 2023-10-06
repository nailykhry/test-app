const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateJWT = require('./generate-token.util')
const comparePass = require('./compare-password.util')
const encryptPass = require('./encrypt-password.util')

const comparePassword = comparePass({ bcrypt })
const encryptPassword = encryptPass({ bcrypt })
const generateToken = generateJWT({ jwt })

module.exports = { encryptPassword, comparePassword, generateToken }
