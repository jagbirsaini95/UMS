const express = require('express')
const router = express.Router()
const userValidation = require("./schema/validatorJoi");
const verifyToken = require('./routers/jwtverify');
const feedbackvalidator = require('./schema/validatorfeedback')
const { register, login, user, updateuser, deleteuser, forgetpassword, logout, users, grantAccess } = require('./routers/router')
const { feedback, getallfeedbacks } = require('./routers/feedbackRoute')

//register routes for user and admin
router.post('/register-user', userValidation, (req, res, next) => {
    register(req, 'user', res, next)
})
router.post('/register-admin', userValidation, (req, res, next) => {
    register(req, 'admin', res, next)
})
//login routes for user and admin
router.post('/login', login)

// router.post('/login-admin', (req, res, next) => {
//     login(req, 'admin', res, next)
// })

// admin / user profile route
router.get('/user/profile', verifyToken, user)

//admin all users route
// router.get('/users', verifyToken, users)
// router.get('/users', verifyToken, grantAccess('readAny', 'profile'), users)
router.get('/users', verifyToken, users)


router.post('/forgetpassword', forgetpassword)
router.put('/updateuser', updateuser);
router.delete('/deleteuser/', deleteuser);
router.get('/logout', logout)

router.post('/feedbackform', feedbackvalidator, feedback)
router.get('/getfeedbacks', getallfeedbacks)

module.exports = router;