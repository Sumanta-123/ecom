const router = require('express').Router()
const User = require('../models/User');
const { userRegister, userLogin, userAuth, checkRole, serializeUser } = require('../utils/Auth')
//User Registration Route
router.post('/register-user', async (req, res) => {
    await userRegister(req.body, 'user', res);
})
//Retailer Registration Route
router.post('/register-retailer', async (req, res) => {
    await userRegister(req.body, 'retailer', res);
})

//Admin Registration Route
router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, 'admin', res);
})


//User Login Route
router.post('/login-user', async (req, res) => {
    await userLogin(req.body, 'user', res)
})

//Retailer Login Route
router.post('/login-retailer', async (req, res) => {
    await userLogin(req.body, 'retailer', res)
})

//Admin Login Route
router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, 'admin', res)
})
//Common profile routes
router.get('/profile', userAuth, async (req, res) => {
    return res.json(serializeUser(req.user))
})

//User Protected Route
router.get('/user-protected', userAuth, checkRole(["user", "admin"]), async (req, res) => {
    res.json({msg: "Hello User"})
})

//Retailer Protected Route
router.get('/retailer-protected', userAuth, checkRole(["retailer", "admin"]), async (req, res) => {
    res.json({msg: "Hello Retailer"})
})

//Admin Protected Route
router.get('/admin-protected', userAuth, checkRole(["admin"]), async (req, res) => {
    res.json({msg: "Hello Admin"})
})

// //Admin Protected Route
// router.post('/super-addmin-protect', userAuth, checkRole(["admin"]), async (req, res)=>{})

module.exports = router;