const apiModelEntity = require('./api-model.entity')
const productEntity = require('./product.entity')

const services = Object.freeze({
  apiModelEntity,
  productEntity
})

module.exports = {
  services,
  apiModelEntity,
  productEntity
}
