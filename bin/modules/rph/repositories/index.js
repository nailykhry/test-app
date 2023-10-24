const dbConnect = require('../../../config/mongo.config')
const livestockData = require('./ternak.query.js')
const productData = require('./product.query.js')

const livestockDB = livestockData({ dbConnect })
const productDB = productData({ dbConnect })

module.exports = {
  livestockDB,
  productDB
}
