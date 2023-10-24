const {
  retrieveDataFromAPIUseCase,
  addProductUsecase,
  getProductByIdUsecase,
  getAllProductsUsecase,
  getProductByIdHalalUsecase
} = require('../usecases/index')

const retrieveDataFromAPIControllerFunc = require('./retrieve-data.controller')
const addProductController = require('./add-product.controller')
const viewProductController = require('./get-product-detail.controller')
const viewProductsController = require('./get-all-products.controller')
const viewProductByIdHalalController = require('./get-product-by-idhalal.controller')
const qrProducts = require('./qr-products.controller')
const qrData = require('./qr-data.controller')

const retrieveDataFromAPIController = retrieveDataFromAPIControllerFunc({ retrieveDataFromAPIUseCase })
const postRPHProductController = addProductController({ addProductUsecase })
const getAllProductsController = viewProductsController({ getAllProductsUsecase })
const getProductByIdController = viewProductController({ getProductByIdUsecase })
const getProductByIdHalalController = viewProductByIdHalalController({ getProductByIdHalalUsecase })
const qrDataController = qrData({ getProductByIdUsecase })
const qrProductsController = qrProducts({ getAllProductsUsecase })

module.exports = Object.freeze({
  retrieveDataFromAPIController,
  postRPHProductController,
  getAllProductsController,
  getProductByIdController,
  getProductByIdHalalController,
  qrProductsController,
  qrDataController
})
