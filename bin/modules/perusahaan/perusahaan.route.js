const router = require('express').Router()

const {
  getAllPerusahaanController,
  addPerusahaanController
} = require('./controllers/index')

const authMiddleware = require('../../middlewares/index')
const roleMiddleware = require('../../middlewares/role.middleware')
const makeExpressCallback = require('../../express-callback/index')

router.get('/perusahaan', authMiddleware, makeExpressCallback(getAllPerusahaanController))
router.post('/perusahaan', authMiddleware, makeExpressCallback(addPerusahaanController))

module.exports = router
