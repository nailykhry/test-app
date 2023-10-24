const {
  getAllPerusahaanUsecase,
  addPerusahaanUsecase
} = require('../usecases/index')

const viewPerusahaanController = require('./get-all-perusahaan.controller')
const postPerusahaanController = require('./add-perusahaan.controller')

const getAllPerusahaanController = viewPerusahaanController({ getAllPerusahaanUsecase })
const addPerusahaanController = postPerusahaanController({ addPerusahaanUsecase })

module.exports = Object.freeze({
  getAllPerusahaanController,
  addPerusahaanController
})
