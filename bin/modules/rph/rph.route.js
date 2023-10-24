const router = require('express').Router()

const {
  retrieveDataFromAPIController,
  postRPHProductController,
  getProductByIdController,
  getAllProductsController,
  getProductByIdHalalController,
  qrProductsController,
  qrDataController
} = require('./controllers/index')

const authMiddleware = require('../../middlewares/index')
const roleMiddleware = require('../../middlewares/role.middleware')
const makeExpressCallback = require('../../express-callback/index')

router.get('/fetch/:id', authMiddleware, roleMiddleware('rph'), makeExpressCallback(retrieveDataFromAPIController))
router.post('/product', authMiddleware, roleMiddleware('rph'), makeExpressCallback(postRPHProductController))
router.get('/product/:id', makeExpressCallback(getProductByIdController))
router.get('/products', makeExpressCallback(getAllProductsController))
router.get('/productbyidhalal/:id_halal', makeExpressCallback(getProductByIdHalalController))

router.get('/qr/:id', async (req, res) => {
  try {
    const productId = req.params.id
    const productData = await qrDataController(productId)
    console.log(productData.statusCode)
    res.render('qr-example', { product: productData })
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

router.get('/qr', async (req, res) => {
  try {
    const productsData = await qrProductsController()
    console.log(productsData)
    res.render('list-qr', { products: productsData })
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
