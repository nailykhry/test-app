require('tls').DEFAULT_MIN_VERSION = 'TLSv1'

const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const path = require('path')
const helmet = require('helmet')
const app = express()

global.Responser = require('../utils/LibResponserUtil')
global.CustomError = require('../utils/CustomErrorUtil')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger('dev'))
app.use(helmet({ crossOriginResourcePolicy: false }))

app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')))
app.get('/api/v1', (req, res) => {
  res.send('Hello API')
})

// ROUTER
app.use('/api/v1', require('../modules/users/user.route'))
app.use('/api/v1', require('../modules/perusahaan/perusahaan.route'))
app.use('/api/v1/rph', require('../modules/rph/rph.route'))

app.get('/api/v1/example', (req, res) => {
  res.render('qr-example', { title: 'QR CODE PAGE', message: 'Hello, EJS!' })
})

const PORT = process.env.APP_PORT || 3000

app.listen(PORT, '0.0.0.0',  () => {
  console.log(`Server is running on port ${PORT}.`)
})

module.exports = app
