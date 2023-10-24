const viewProductByIdHalalUsecase = ({ productDB }) => {
  return async function viewProduct (info) {
    const { id_halal } = info
    const result = await productDB.getProductByIdHalal(id_halal)
    return result
  }
}

module.exports = viewProductByIdHalalUsecase
