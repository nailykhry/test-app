const dbConnect = require('../../../config/mongo.config')
const perusahaanData = require('./perusahaan.query')

const perusahaanDB = perusahaanData({ dbConnect })

module.exports = perusahaanDB
