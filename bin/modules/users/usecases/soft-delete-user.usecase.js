const CustomError = require('../../../utils/custom-error.util')
const softDelUser = ({ userDB }) => {
  return async function deleteUser (info) {
    const { id } = info

    const userExists = await userDB.getUserById(id)

    if (!userExists) {
      throw new CustomError('User does not exist!', 404, null)
    }

    if (userExists.deleted_at) {
      throw new CustomError('User is already inactive!', 404, null)
    }

    const result = await userDB.softDeleteUser(id)
    return { message: 'User Deactivated Successfully', data: result.rows }
  }
}

module.exports = softDelUser
