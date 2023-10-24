const retrieveDataFromAPIControllerFunc = ({ retrieveDataFromAPIUseCase }) => {
  return async function retrieve (httpRequest) {
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
        id: httpRequest.params.id
      }
      const livestock = await retrieveDataFromAPIUseCase(response)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          success: true,
          code: 200,
          mesage: 'Livestock successfully added',
          data: livestock
        }
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
        statusCode: e.message,
        body: {
          success: false,
          code: e.statusCode,
          mesage: e.mesage,
          data: e.data
        }
      }
    }
  }
}

module.exports = retrieveDataFromAPIControllerFunc
