const qrProducts = ({ getAllProductsUsecase}) =>{
    return async function qrProducts (httpRequest) {
        const headers = {
          'Content-Type': 'application/json'
        }
        try {
          
          const products = await getAllProductsUsecase()
          
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 200,
            body: {
              products : products
            }
          }
        } catch (e) {
          console.log(e.message)
          return {
            headers,
            statusCode: e.statusCode,
            body: {
              "success" : "false",
              "code" : e.statusCode,
              "message" : e.message,
              "data" : e.data
            }
          }
        }
      }
}

module.exports = qrProducts