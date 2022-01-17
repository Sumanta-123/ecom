const router = require('express').Router();
const { userAuth , checkRole} = require('../utils/Auth')
const categoryController = require('../controllers/categoryController')
const Category = require('../models/Category');

//Create Category route
router.route('/category')
    .get(categoryController.getCategories)
    .post(userAuth, checkRole(["admin"]), categoryController.createCategory)
//Only Admin can delete category
router.route('/category/:id')
    .delete(userAuth, checkRole(['admin']), categoryController.deleteCategory)
    .put(userAuth, checkRole(['admin']), categoryController.updateCategory)
    
module.exports = router;