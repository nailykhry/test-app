const CustomError = require('../../../utils/custom-error.util')
const registerUser = ({ userDB, userEntity, encryptPassword }) => {
  return async function postUser (info) {
    const result = userEntity(info)
    const userExists = await userDB.findByUsername(result.username)

    if (userExists !== null && userExists.rowCount !== 0) {
      throw new CustomError('User already exists', 400, null)
    }

    const hashed_password = await encryptPassword(result.password)

    const data = await userDB.registerUser({
      username: result.username,
      password: hashed_password,
      name: result.name,
      contact_number: result.contact_number,
      user_role_id: result.user_role_id
    })

    return {
      msg: 'User added successfully.',
      user: data.rows
    }
  }
}
module.exports = registerUser
