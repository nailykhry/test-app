const CustomError = require('../../../utils/custom-error.util');
const productEntity = (product) => {
    const { livestock_id, slaughterman, slaughter_date, livestock_part, created_at, updated_at } = product
 
    if (!livestock_id) {
        throw new CustomError('Id ternak kosong!', 400)
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
        slaughterman, 
        slaughter_date, 
        livestock_part, 
        created_at, 
        updated_at
    })
  }
  
  module.exports = productEntity
  