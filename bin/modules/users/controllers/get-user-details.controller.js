const fetchUserDetailsController = ({ viewUserUseCase }) => {
  return async function getDetails (httpRequest) {
    try {
      const { source = {}, ...info } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      const response = {
        ...info,
        source,
        id: httpRequest.params.id
      }
      const user = await viewUserUseCase(response)
      if (!user) {
        Responser.error(httpRequest.res, 'Data yang dicari tidak ada', user, 404)
      }

      Responser.success(httpRequest.res, 'Berhasil mengambil data user by id', user, 200)
    } catch (e) {
      console.log(e)
      Responser.error(httpRequest.res, 'Internal server error', e, 500)
    }
  }
}

module.exports = fetchUserDetailsController
