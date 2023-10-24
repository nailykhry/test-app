const { check, validationResult } = require('express-validator')
const registerUserController = ({ registerUseCase }) => {
  return async function post (httpRequest) {
    try {
      const { source = {}, ...info } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      const response = {
        ...info,
        source
      }

      const errors = validationResult(httpRequest.req)
      if (!errors.isEmpty()) {
        return Responser.error(httpRequest.res, errors.errors[0].path + ' ' + errors.errors[0].msg, errors.errors, 400)
      }

      const user = await registerUseCase(response)
      Responser.success(httpRequest.res, 'Registrasi berhasil', user, 201)
      
    } catch (e) {
      console.log(e)
      Responser.error(httpRequest.res, e.message, e.data, e.statusCode)
    }
  }
}

module.exports = registerUserController
