const { ObjectId } = require('mongodb')
const livestockData = ({ dbConnect }) => {
  return Object.freeze({
    getAllLivestocks,
    getLivestockById,
    addLivestock,
    editLivestock,
    softDeleteLivestock,
    findByLivestockName
  })

  async function getAllLivestocks () {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('livestocks')
      const livestocks = await collection.find({ deleted_at: null }).toArray()
      return livestocks
    } catch (error) {
      console.error('Gagal mengambil ternak:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function getLivestockById (userObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('livestocks')

      const livestock = await collection.findOne({ _id: new ObjectId(userObjectId), deleted_at: null })

      return livestock
    } catch (error) {
      console.error('Gagal mengambil ternak berdasarkan ID:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function addLivestock (livestock) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('livestocks')
      const result = await collection.insertOne(livestock)

      return result
    } catch (error) {
      console.error('Gagal menambahkan livestock:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function editLivestock (livestockObjectId, updatedLivestockData) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('livestocks')

      const result = await collection.updateOne(
        { _id: new ObjectId(livestockObjectId) },
        { $set: updatedLivestockData }
      )
      return result
    } catch (error) {
      console.error('Gagal mengedit ternak:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function findByLivestockName (name) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('livestocks')
      const livestock = await collection.findOne({ name })
      return livestock
    } catch (error) {
      console.error('Gagal mencari ternak berdasarkan nama:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function softDeleteLivestock (livestockObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('livestocks')

      const result = await collection.updateOne(
        { _id: new ObjectId(livestockObjectId) },
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

module.exports = livestockData
