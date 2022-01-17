const Category = require('../models/Category');

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            //Check admin is sucess
            //if user role is admin then only can create, delete, update the category
            const { name } = req.body;
            const category = await Category.findOne({ name });
            if (category)
            {
                return res.status(400).json({msg: "This category already exist"})
            }
            const newCategory = new Category({ name })
            await newCategory.save()
            res.status(200).json({msg: 'Created a category'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.json({msg: "One category deleted"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },


    updateCategory: async (req, res) => {
        try {
            
            let { name } = req.body;
            await Category.findOneAndUpdate({_id: req.params.id},{name});
            res.json({msg: "One category updated"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryController;