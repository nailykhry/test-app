const postPerusahaanUsecase = ({ perusahaanEntity, perusahaanDB }) => {
  return async function postPerusahaan (info) {
    const result = perusahaanEntity(info)
    const perusahaan = await perusahaanDB.addNewPerusahaan({
      nama_perusahaan: result.nama_perusahaan,
      alamat_usaha: result.alamat_usaha,
      aspek_legal: result.aspek_legal,
      created_at: new Date(),
      updated_at: new Date()
    })

    return {
      msg: 'Perusahaan added successfully.',
      perusahaan
    }
  }
}

module.exports = postPerusahaanUsecase
