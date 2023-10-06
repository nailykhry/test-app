const userUpdateEntity = (user) => {
  const { username, password, name, contact_number, user_role_id } = user

  if (!username) {
    throw new Error('User harus memiliki username!')
  }

  if (!password) {
    throw new Error('User harus memiliki password!')
  }

  if (!name) {
    throw new Error('User harus memiliki name!')
  }

  if (!contact_number) {
    throw new Error('User harus memiliki contact_number!')
  }

  if (!user_role_id) {
    throw new Error('User harus memiliki role!')
  }

  return Object.freeze({
    username,
    password,
    name,
    contact_number,
    user_role_id
  })
}

module.exports = userUpdateEntity
