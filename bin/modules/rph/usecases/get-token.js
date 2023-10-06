const getToken = ({ fs, path }) => {
  const filePath = path.join(__dirname, '..', '..', '..', '..', 'keys', 'auth-token.key')

  try {
    const response = fs.readFileSync(filePath, 'utf-8')
    const responseParse = JSON.parse(response)
    return responseParse.access_token
  } catch (error) {
    console.error(error)
    return { error: 'Gagal mengambil token' }
  }
}

module.exports = getToken
