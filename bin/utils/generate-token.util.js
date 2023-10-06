const generateJWT = ({ jwt }) => {
  function signToken (user_id, user_role) {
    const payload = {
      user: user_id,
      role: user_role
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' })
  }
  return signToken
}

module.exports = generateJWT
