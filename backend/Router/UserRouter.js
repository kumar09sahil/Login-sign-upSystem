const express = require('express')
const userController = require('../Controller/UserController')
const authController = require('../Controller/authController')

const userRouter = express.Router()

userRouter.route('/updateDetails').patch(authController.protect,userController.updateDetails)
userRouter.route('/DeleteMe').patch(authController.protect,userController.deleteMe)
userRouter.route('/updatePassword').patch(authController.protect,userController.updatePassword)
userRouter.route('/fetchDetails').get(authController.protect,userController.fetchDetails)

module.exports = userRouter