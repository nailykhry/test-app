const CustomError = require('../../../utils/CustomErrorUtil')
const perusahaanEntity = (perusahaan) => {
  const { nama_perusahaan, alamat_usaha, aspek_legal, created_at, updated_at } = perusahaan

  if (!nama_perusahaan) {
    throw new CustomError('Nama perusahaan kosong!', 400)
  }

  if (!alamat_usaha) {
    throw new CustomError('Alamat usaha kosong!', 400)
  }

  return Object.freeze({
    nama_perusahaan,
    alamat_usaha,
    aspek_legal,
    created_at,
    updated_at
  })
}

module.exports = perusahaanEntity
