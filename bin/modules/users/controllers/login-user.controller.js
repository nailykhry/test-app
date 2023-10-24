const loginUserAuthController = ({ loginUserUseCase }) => {
  return async function getAll (httpRequest) {
    try {
      const { source = {}, ...info } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      const response = {
        ...info,
        source
      }
      const user = await loginUserUseCase(response)
      Responser.success(httpRequest.res, 'User berhasil login', user, 200)
    } catch (e) {
      console.log(e)
      Responser.error(httpRequest.res, e.message, e.data, e.statusCode)
    }
  }
}

module.exports = loginUserAuthController
