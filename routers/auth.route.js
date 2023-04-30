const route = require('express').Router()
const authController = require('../controllers/auth.controller')
const parser = require('express').urlencoded({extended:true})
const guradAuth = require('./guardAuth')

route.get('/register',guradAuth.isNotAuth,authController.renderRegisterPage)

route.post('/register',parser,guradAuth.isNotAuth,authController.registerController)


route.get('/login',guradAuth.isNotAuth,authController.renderLoginPage)

route.post('/login',parser,guradAuth.isNotAuth,authController.loginController)

route.post('/logout',authController.logoutCOntroller)

module.exports=route