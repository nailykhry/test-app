const viewAllPerusahaan = ({ perusahaanDB }) => {
  return async function viewPerusahaan () {
    const result = await perusahaanDB.getAllPerusahaan()
    return result
  }
}

module.exports = viewAllPerusahaan
