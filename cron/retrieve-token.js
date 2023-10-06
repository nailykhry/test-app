const cron = require('node-cron')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '..', 'keys', 'auth-token.key')
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const task = cron.schedule('* * * * *', async () => {
  try {
    console.log('Tugas cron dijalankan setiap jam pada menit ke-0')
    const requestBody = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    try {
      const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      const newAccessToken = response.data.access_token

      const tokenData = {
        access_token: newAccessToken,
        expires_in: 3600
      }

      try {
        fs.writeFileSync(filePath, JSON.stringify(tokenData), 'utf-8', { flag: 'w' })
        console.log('Berkas berhasil ditulis atau dibuat.')
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error('Berkas tidak ditemukan. Membuat berkas baru.')
          fs.writeFileSync(filePath, JSON.stringify(tokenData), 'utf-8')
          console.log('Berkas baru telah dibuat.')
        } else {
          console.error('Terjadi kesalahan saat menulis berkas:', error.message)
        }
      }
    } catch (error) {
      console.error(error)
      return { error: 'Gagal mengambil data dari API' }
    }
  } catch (error) {
    console.error('Gagal memperbarui token:', error)
  }
})

task.start()
