const {
  registerUseCase,
  editUserUseCase,
  viewAllUsersUseCase,
  viewUserUseCase,
  softDeleteUserUseCase,
  loginUserUseCase
} = require('../usecases/index')

const registerUserController = require('./register-user.controller')
const loginUserAuthController = require('./login-user.controller')
const editUserController = require('./edit-user.controller')
const fetchAllUsersController = require('./get-all-users.controller')
const fetchUserDetailsController = require('./get-user-details.controller')
const deleteUserController = require('./soft-delete-user.controller')

const postUserController = registerUserController({ registerUseCase })
const loginUserController = loginUserAuthController({ loginUserUseCase })
const putUserController = editUserController({ editUserUseCase })
const getAllUsersController = fetchAllUsersController({ viewAllUsersUseCase })
const getUserByIdController = fetchUserDetailsController({ viewUserUseCase })
const softDeleteUserController = deleteUserController({
  softDeleteUserUseCase
})

module.exports = Object.freeze({
  postUserController,
  putUserController,
  getAllUsersController,
  loginUserController,
  softDeleteUserController,
  getUserByIdController
})
