class CustomError extends Error {
  constructor (message, statusCode, data) {
    super(message)
    this.name = 'CustomError'
    this.statusCode = statusCode
    this.data = data
  }
}

module.exports = CustomError
