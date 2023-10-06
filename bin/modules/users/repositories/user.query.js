const { ObjectId } = require('mongodb')
const userData = ({ dbConnect }) => {
  return Object.freeze({
    getAllUsers,
    getUserById,
    registerUser,
    editUser,
    softDeleteUser,
    findByUsername
  })

  async function getAllUsers () {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('users')
      const users = await collection.find({ deleted_at: null }).toArray()
      return users
    } catch (error) {
      console.error('Gagal mengambil users:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function getUserById (userObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('users')

      const user = await collection.findOne({ _id: new ObjectId(userObjectId), deleted_at: null })

      return user
    } catch (error) {
      console.error('Gagal mengambil pengguna berdasarkan ID:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function registerUser (user) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('users')
      const result = await collection.insertOne(user)

      return result.insertedId
    } catch (error) {
      console.error('Gagal menambahkan pengguna:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function editUser (userObjectId, updatedUserData) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('users')

      const result = await collection.updateOne(
        { _id: new ObjectId(userObjectId) },
        { $set: updatedUserData }
      )
      return result
    } catch (error) {
      console.error('Gagal mengedit pengguna:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function findByUsername (username) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('users')
      const user = await collection.findOne({ username })
      return user
    } catch (error) {
      console.error('Gagal mencari pengguna berdasarkan username:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function softDeleteUser (userObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('users')

      const result = await collection.updateOne(
        { _id: new ObjectId(userObjectId) },
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

module.exports = userData
