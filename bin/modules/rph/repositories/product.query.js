const { ObjectId } = require('mongodb')
const productData = ({ dbConnect }) => {
  return Object.freeze({
    getAllProducts,
    getProductById,
    getProductByIdHalal,
    addNewProduct,
    editProduct,
    softDeleteProduct,
    findByProductName
  })

  async function getAllProducts () {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')
      const products = await collection.find({ deleted_at: null }).toArray()
      return products
    } catch (error) {
      console.error('Gagal mengambil product:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function getProductById (userObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')

      const product = await collection.findOne({ _id: new ObjectId(userObjectId), deleted_at: null })

      return product
    } catch (error) {
      console.error('Gagal mengambil ternak berdasarkan ID:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function getProductByIdHalal (id) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')

      const product = await collection.findOne({ id_halal: id, deleted_at: null })

      return product
    } catch (error) {
      console.error('Gagal mengambil ternak berdasarkan ID:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function addNewProduct (product) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')
      const result = await collection.insertOne(product)

      return result
    } catch (error) {
      console.error('Gagal menambahkan Product:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function editProduct (productObjectId, updatedProductData) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')

      const result = await collection.updateOne(
        { _id: new ObjectId(productObjectId) },
        { $set: updatedProductData }
      )
      return result
    } catch (error) {
      console.error('Gagal mengedit prodict:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function findByProductName (name) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')
      const product = await collection.findOne({ name })
      return product
    } catch (error) {
      console.error('Gagal mencari produk berdasarkan nama:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }

  async function softDeleteProduct (productObjectId) {
    let connection
    try {
      connection = await dbConnect()
      const collection = connection.db().collection('products-rph')

      const result = await collection.updateOne(
        { _id: new ObjectId(productObjectId) },
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

module.exports = productData
