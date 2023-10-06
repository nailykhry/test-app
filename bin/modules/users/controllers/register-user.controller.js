const registerUserController = ({ registerUseCase }) => {
  return async function post (httpRequest) {
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

      const user = await registerUseCase(response)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          "success" : "true",
          "code" : 200,
          "message" : "Registered successfully",
          "data" : user
        }
      }
    } catch (e) {
      console.log(e)
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

module.exports = registerUserController
