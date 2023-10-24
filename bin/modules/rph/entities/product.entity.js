const CustomError = require('../../../utils/CustomErrorUtil')
const productEntity = (product) => {
  const { livestock_id, id_halal, slaughterman, slaughter_date, livestock_part, created_at, updated_at } = product

  if (!livestock_id) {
    throw new CustomError('Id ternak kosong!', 400)
  }

  if (!id_halal) {
    throw new CustomError('Id halal kosong!', 400)
  }

  if (!slaughterman) {
    throw new CustomError('Juru sembelih kosong!', 400)
  }

  if (!slaughter_date) {
    throw new CustomError('Tanggal sembelih kosong!', 400)
  }

  if (!livestock_part) {
    throw new CustomError('Bagian ternak kosong!', 400)
  }

  return Object.freeze({
    livestock_id,
    id_halal,
    slaughterman,
    slaughter_date,
    livestock_part,
    created_at,
    updated_at
  })
}

module.exports = productEntity
