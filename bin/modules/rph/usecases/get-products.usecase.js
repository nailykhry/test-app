const getProducts = ({ productDB }) => {
    return async function getAllProducts () {
      const result = await productDB.getAllProducts()
      return result
    }
  }
  
  module.exports = getProducts
  