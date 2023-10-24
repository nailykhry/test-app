const userDB = require('../repositories/index')
const {
  userEntity,
  userLoginEntity,
  userUpdateEntity
} = require('../entities/index')

const { generateToken, comparePassword } = require('../../../utils/index')

const registerUser = require('./register-user.usecase')
const editUser = require('./edit-user.usecase')
const viewUser = require('./view-user.usecase')
const viewAllUsers = require('./view-all-users.usecase')
const loginUser = require('./login-user.usecase')
const softDelUser = require('./soft-delete-user.usecase')

const registerUseCase = registerUser({ userDB, userEntity })
const editUserUseCase = editUser({ userDB, userUpdateEntity })
const viewAllUsersUseCase = viewAllUsers({ userDB })
const viewUserUseCase = viewUser({ userDB })
const loginUserUseCase = loginUser({
  userDB,
  userLoginEntity,
  generateToken,
  comparePassword
})
const softDeleteUserUseCase = softDelUser({ userDB })

module.exports = {
  registerUseCase,
  editUserUseCase,
  viewAllUsersUseCase,
  viewUserUseCase,
  loginUserUseCase,
  softDeleteUserUseCase
}
