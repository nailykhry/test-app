const userLoginEntity = (user) => {
  const { username, password } = user

  if (!username) {
    throw new Error('Enter Username!')
  }

  if (!password) {
    throw new Error('Enter Password!')
  }

  return Object.freeze({
    username,
    password
  })
}

module.exports = userLoginEntity
