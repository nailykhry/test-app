const deleteUserController = ({ softDeleteUserUseCase }) => {
  return async function get (httpRequest) {
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

      Responser.success(httpRequest.res, 'Data user berhasil dihapus', user, 204)
    } catch (e) {
      console.log(e)
      Responser.error(httpRequest.res, e.message, e.data, e.statusCode)
    }
  }
}

module.exports = deleteUserController
