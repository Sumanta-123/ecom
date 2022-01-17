const Products = require('../models/Product');


const productController = {
    getProducts: async (req, res) => {
        try {
            return res.json({msg: 'Get all products'})
        } catch (err) {
            if (err)
            {
                return res.status(500).json({msg: err.message})
            }
        }
    },

    createProduct: async (req, res) => {
        try {
            //Create product functionaliy goes here
             return res.json({msg: 'Created a product'})
            
        } catch (err) {
            if (err)
            {
                return res.status(500).json({msg: err.message})
            }
        }
    },

    deleteProduct: async (req, res) => {
        try {
            //Delete product functionaliy goes here
             return res.json({msg: 'Product deleted'})
            
        } catch (err) {
            if (err)
            {
                return res.status(500).json({msg: err.message})
            }
        }
    },
    
    updateProduct: async (req, res) => {
        try {
             //Update product functionaliy goes here
            return res.json({msg: 'Product updated'})
            
        } catch (err) {
            if (err)
            {
                return res.status(500).json({msg: err.message})
            }
        }
    },
}

module.exports = productController;