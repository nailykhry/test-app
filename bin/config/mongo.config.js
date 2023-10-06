require('dotenv').config()

const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
async function dbConnect () {
  try {
    await client.connect()
    console.log('Koneksi ke MongoDB berhasil')
    return client
  } catch (error) {
    console.error('Koneksi ke MongoDB gagal', error)
  }
}

module.exports = dbConnect
