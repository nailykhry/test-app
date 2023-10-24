require('dotenv').config()

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const { livestockDB, productDB } = require('../repositories/index')

const {
  productEntity
} = require('../entities/index')

const getToken = require('./get-token')
const retrieveDataFromAPI = require('./retrieve-data.usecase')
const addProduct = require('./add-product.usecase')
const getDetailProduct = require('./get-product-detail.usecase')
const getProducts = require('./get-products.usecase')
const viewProductByIdHalalUsecase = require('./view-product-by-idhalal.usecase.js')

const authToken = getToken({ fs, path })
const retrieveDataFromAPIUseCase = retrieveDataFromAPI({ axios, authToken, livestockDB })
const addProductUsecase = addProduct({ productDB, livestockDB, productEntity })
const getProductByIdUsecase = getDetailProduct({ productDB })
const getAllProductsUsecase = getProducts({ productDB })
const getProductByIdHalalUsecase = viewProductByIdHalalUsecase({ productDB })

module.exports = Object.freeze({
  retrieveDataFromAPIUseCase,
  addProductUsecase,
  getProductByIdUsecase,
  getAllProductsUsecase,
  getProductByIdHalalUsecase
})
