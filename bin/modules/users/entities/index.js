const userEntity = require('./user.entity')
const userLoginEntity = require('./user-login.entity')
const userUpdateEntity = require('./edit-user.entity')

const services = Object.freeze({
  userEntity,
  userLoginEntity,
  userUpdateEntity
})

module.exports = {
  services,
  userEntity,
  userLoginEntity,
  userUpdateEntity
}
