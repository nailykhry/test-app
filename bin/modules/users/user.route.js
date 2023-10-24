const router = require('express').Router()

const {
  postUserController,
  putUserController,
  softDeleteUserController,
  getAllUsersController,
  loginUserController,
  getUserByIdController
} = require('./controllers/index')

const authMiddleware = require('../../middlewares/index')
const makeExpressCallback = require('../../express-callback/index')
const Validator = require('../../validation/users/UserValidation')

router.post('/register', Validator.create, makeExpressCallback(postUserController))
router.post('/login', makeExpressCallback(loginUserController))
router.get('/user/:id', authMiddleware, makeExpressCallback(getUserByIdController))
router.patch('/user-edit/:id', authMiddleware, makeExpressCallback(putUserController))
router.get('/users', authMiddleware, makeExpressCallback(getAllUsersController))
router.patch('/user-delete/:id', authMiddleware, makeExpressCallback(softDeleteUserController))

module.exports = router
