const CustomError = require('../../../utils/CustomErrorUtil')

const editUser = ({ userDB, userUpdateEntity }) => {
  return async function putUser (user) {
    const {
      username,
      password,
      name,
      contact_number,
      user_role_id,
      id
    } = user

    const result = userUpdateEntity({
      username,
      password,
      name,
      contact_number,
      user_role_id
    })

    const data = await userDB.editUser(
      {
        id
      },
      {
        username: result.username,
        password: result.password,
        name: result.name,
        contact_number: result.contact_number,
        user_role_id: result.user_role_id
      })

    return {
      msg: 'User updated successfully.',
      user: data.rows
    }
  }
}
module.exports = editUser
