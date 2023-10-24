const { check, validationResult } = require('express-validator')

const create = [
  check('email').isLength({ min: 1 }).withMessage('tidak boleh kosong')
    .isEmail().withMessage('format tidak sesuai')
    .isLength({ max: 100 }).withMessage('tidak boleh lebih dari 100 karakter'),
  check('nama').isLength({ min: 1 }).withMessage('Tidak boleh kosong')
    .isLength({ max: 50 }).withMessage('Tidak boleh lebih dari 50 karakter'),
  check('no_telp').isNumeric().withMessage('Hanya boleh angka')
    .isLength({ min: 9 }).withMessage('Tidak boleh kosong kurang dari 9 karakter')
    .isLength({ max: 13 }).withMessage('Tidak boleh lebih dari 13 karakter'),
  check('password').isLength({ min: 8 }).withMessage('Tidak boleh kurang dari 8 karakter')
    .isLength({ max: 50 }).withMessage('Tidak boleh lebih dari 13 karakter'),
  check('role').isLength({ min: 1 }).withMessage('Tidak boleh kosong')
    .isLength({ max: 20 }).withMessage('Tidak boleh lebih dari 13 karakter'),
  check('id_perusahaan').isLength({ min: 1 }).withMessage('Tidak boleh kosong')
    .isLength({ max: 13 }).withMessage('Tidak boleh lebih dari 13 karakter'),
]

module.exports = {
  create
}
