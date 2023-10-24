const userEntity = (user) => {
  const { email, nama, no_telp, password, role, id_perusahaan } = user


  return Object.freeze({
    email,
    nama,
    no_telp,
    password,
    role,
    id_perusahaan
  })
}
module.exports = userEntity
