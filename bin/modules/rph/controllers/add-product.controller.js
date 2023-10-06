const addProductController = ({ addProductUsecase }) => {
    return async function add (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const { source = {}, ...info } = httpRequest.body
        source.ip = httpRequest.ip
        source.browser = httpRequest.headers['User-Agent']
        const response = {
          ...info,
          source,
        }
        const product = await addProductUsecase(response)
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          body: {
            "success" : true,
            "code" : 200,
            "mesage" : "Product successfully added",
            "data" : product
          }
        }
      } catch (e) {
        return {
          headers,
          statusCode: e.statusCode,
          body: {
            "success" : "false",
            "code" : e.statusCode,
            "message" : e.message,
            "data" : null
          }
        }
      }
    }
  }
  
  module.exports = addProductController
  