const fetchAllUsersController = ({ viewAllUsersUseCase }) => {
  return async function getAll (httpRequest) {
    try {
      const { source = {}, ...info } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      const response = {
        ...info,
        source
      }
      const users = await viewAllUsersUseCase(response)
      console.log(httpRequest)
      Responser.success(httpRequest.res, 'success', users, 200)
    } catch (e) {
      console.log(e.message)
      Responser.error(httpRequest.res, 'error', e, 404)
    }
  }
}

module.exports = fetchAllUsersController
