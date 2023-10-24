const CustomError = require('../../../utils/CustomErrorUtil')

const loginUser = ({
  userDB,
  userLoginEntity,
  generateToken,
  comparePassword
}) => {
  return async function postLoginUser (info) {
    const result = userLoginEntity(info)
    const userExists = await userDB.findByUsername(result.username)
    let token

    if (!userExists) {
      throw new CustomError('User does not exist!', 404, null)
    }

    if (userExists.deleted_at) {
      throw new CustomError('User is already inactive!', 404, null)
    }

    const validPass = await comparePassword(
      result.password,
      userExists.password
    )

    // nti ganti pake NIK
    if (validPass) {
      token = generateToken(userExists.username, userExists.user_role_id)
    } else {
      throw new CustomError('Incorrect Password!', 400, null)
    }

    return {
      token,
      username: userExists.username,
      name: userExists.name,
      contact_number: userExists.contact_number
    }
  }
}
module.exports = loginUser
