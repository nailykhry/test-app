const dbConnect = require('../../../config/mongo.config')
const userData = require('./user.query.js')

const userDB = userData({ dbConnect })

module.exports = userDB
