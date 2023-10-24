const makeExpressCallback = (controller) => {
  return async (req, res) => {
    try {
      const httpRequest = {
        req,
        res,
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        protocol: req.protocol,
        host: req.get('host'),
        file: req.file,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent'),
          Authorization: req.get('Authorization'),
          'Access-Control-Allow-Origin': '*'
        }
      }

      const httpResponse = await controller(httpRequest)
      console.log(httpResponse)
      
    } catch (e) {
      console.error(e)
      console.log(e)
      res.sendStatus(500)
    }
  }
}

module.exports = makeExpressCallback
