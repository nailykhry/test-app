const qrData = ({ getProductByIdUsecase }) => {
  return async function view (id) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const response = {
        id
      }
      const product = await getProductByIdUsecase(response)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: product
      }
    } catch (e) {
      return {
        headers,
        statusCode: e.statusCode,
        body: {
          success: 'false',
          code: e.statusCode,
          message: e.message,
          data: null
        }
      }
    }
  }
}

module.exports = qrData
