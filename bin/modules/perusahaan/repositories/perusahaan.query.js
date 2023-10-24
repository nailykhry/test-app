const { ObjectId } = require('mongodb')
const perusahaanData = ({ dbConnect }) => {
  return Object.freeze({
    getAllPerusahaan,
    getPerusahaanById,
    addNewPerusahaan,
    editPerusahaan,
    softDeletePerusahaan,
    findByPerusahaanName
  })

  async function getAllPerusahaan () {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('perusahaan')
      const perusahaan = await collection.find({ deleted_at: null }).toArray()
      return perusahaan
    } catch (error) {
      console.error('Gagal mengambil Perusahaan:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function getPerusahaanById (userObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('perusahaan')

      const perusahaan = await collection.findOne({ _id: new ObjectId(userObjectId), deleted_at: null })

      return perusahaan
    } catch (error) {
      console.error('Gagal mengambil Perusahaan berdasarkan ID:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function addNewPerusahaan (perusahaan) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('perusahaan')
      const result = await collection.insertOne(perusahaan)

      return result
    } catch (error) {
      console.error('Gagal menambahkan Perusahaan:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function editPerusahaan (perusahaanObjectId, updatedPerusahaanData) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('perusahaan')

      const result = await collection.updateOne(
        { _id: new ObjectId(perusahaanObjectId) },
        { $set: updatedPerusahaanData }
      )
      return result
    } catch (error) {
      console.error('Gagal mengedit Perusahaan:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function findByPerusahaanName (name) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('perusahaan')
      const perusahaan = await collection.findOne({ name })
      return perusahaan
    } catch (error) {
      console.error('Gagal mencari perusahaan berdasarkan nama:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function softDeletePerusahaan (perusahaanObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('perusahaan')

      const result = await collection.updateOne(
        { _id: new ObjectId(perusahaanObjectId) },
        {
          $set: {
            deleted_at: new Date()
          }
        }
      )

      return result
    } catch (error) {
      console.log(error)
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }
}

module.exports = perusahaanData
