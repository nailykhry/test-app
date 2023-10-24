const editUserController = ({ editUserUseCase }) => {
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

      const user = await editUserUseCase(response)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          success: true,
          code: 201,
          mesage: 'User successfully edited',
          data: user
        }
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
        statusCode: e.statusCode,
        body: {
          success: 'false',
          code: e.statusCode,
          message: e.message,
          data: e.data
        }
      }
    }
  }
}

module.exports = editUserController
