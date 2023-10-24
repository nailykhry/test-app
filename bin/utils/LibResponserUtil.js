const success = async (res, message = 'success', result = {}, code = null) => {
  try {
    if (code) {
      res.status(200).set('Content-Type', 'application/json').json({
        code,
        status: 'success',
        message,
        result
      })
    } else {
      res.status(200).set('Content-Type', 'application/json').json({
        status: 'success',
        message,
        result
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const error = async (res, message = 'error', result = {}, code = null) => {
  try {
    if (code) {
      res.status(200).json({
        code,
        status: 'error',
        message,
        result
      })
    } else {
      res.status(200).json({
        status: 'error',
        message,
        result
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  success,
  error
}
