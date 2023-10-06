const deleteUserController = ({ softDeleteUserUseCase }) => {
  return async function get (httpRequest) {
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

      const user = await softDeleteUserUseCase(response)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          "success" : "true",
          "code" : 200,
          "message" : "User data has been successfully deleted.",
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

module.exports = deleteUserController
