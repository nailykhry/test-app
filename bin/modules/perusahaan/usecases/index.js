const perusahaanDB = require('../repositories/index')
const {
  perusahaanEntity
} = require('../entities/index')

const viewAllPerusahaan = require('./get-all-perusahaan.usecase')
const postPerusahaanUsecase = require('./add-perusahaan.usecase')

const getAllPerusahaanUsecase = viewAllPerusahaan({ perusahaanDB })
const addPerusahaanUsecase = postPerusahaanUsecase({ perusahaanEntity, perusahaanDB })

module.exports = {
  getAllPerusahaanUsecase,
  addPerusahaanUsecase
}
