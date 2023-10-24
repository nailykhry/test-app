const qr = require('qrcode')

const addProduct = ({ productDB, livestockDB, productEntity }) => {
  return async function postProduct (info) {
    const result = productEntity(info)

    let livestockDataResult
    try {
      livestockDataResult = await livestockDB.getLivestockById(result.livestock_id)
    } catch (e) {
      console.log(e)
    }

    const data = await productDB.addNewProduct({
      id_halal: result.id_halal,
      data_ternak: livestockDataResult,
      juru_sembelih: result.slaughterman,
      tanggal_sembelih: result.slaughter_date,
      bagian_ternak: result.livestock_part,
      created_at: new Date(),
      updated_at: new Date()
    })

    const id = data.insertedId.toHexString()
    const linkToOpen = 'http://localhost:3001/api/v1/rph/qr/' + result.id_halal

    let updatedData
    async function getBase64Data (linkToOpen) {
      return new Promise((resolve, reject) => {
        qr.toDataURL(linkToOpen, (err, url) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            const base64Data = url.split(',')[1]
            resolve(base64Data)
          }
        })
      })
    }

    async function updateProductWithQrcode (id, base64Data) {
      updatedData = await productDB.editProduct(
        {
          id
        },
        {
          qrcode: base64Data,
          updated_at: new Date()
        }
      )
    }

    const base64Data = await getBase64Data(linkToOpen)

    if (base64Data) {
      await updateProductWithQrcode(id, base64Data)
    } else {
      console.error('Failed to obtain base64Data')
    }

    return {
      msg: 'Product added successfully.',
      product: updatedData
    }
  }
}

module.exports = addProduct
