const viewProductsController = ({ getAllProductsUsecase}) =>{
    return async function getAll (httpRequest) {
        const headers = {
          'Content-Type': 'application/json'
        }
        try {
          const { source = {}, ...info } = httpRequest.body
          source.ip = httpRequest.ip
          source.browser = httpRequest.headers['User-Agent']
          const response = {
            ...info,
            source
          }

          const products = await getAllProductsUsecase(response)
    
          return {
            headers: {
              'Content-Type': 'application/json'
            },
            statusCode: 200,
            body: {
              "success" : "true",
              "code" : 200,
              "message" : "Product RPH data has been successfully retrieved.",
              "data" : products
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

module.exports = viewProductsController