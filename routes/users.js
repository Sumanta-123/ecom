const router = require('express').Router()
//User Registration Route
router.post('/register-user', async (req, res)=>{})
//Retailer Registration Route
router.post('/register-retailer', async (req, res)=>{})

//Admin Registration Route
router.post('/register-admin', async (req, res)=>{})


//User Login Route
router.post('/login-user', async (req, res)=>{})

//Retailer Login Route
router.post('/login-retailer', async (req, res)=>{})

//Admin Login Route
router.post('/login-admin', async (req, res)=>{})
//Common profile routes
router.get('/profile', async (req, res)=>{})

//User Protected Route
router.get('/user-protected', async (req, res)=>{})

//Retailer Protected Route
router.get('/retailer-protected', async (req, res)=>{})

//Admin Protected Route
router.get('/admin-protected', async (req, res)=>{})

module.exports = router;