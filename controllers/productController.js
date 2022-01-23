const Product = require('../models/Product');
const Products = require('../models/Product');
const User = require('../models/User');

//Filter, sorting, and paginating
class APIfeatures{
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString }//queryString = req.query;
        // console.log(queryObj);//before delete the page
        const excludesFields = ['page', 'sort', 'limit'];
        excludesFields.forEach(el => delete (queryObj[el]));

        // console.log(queryObj)//After delete the page

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$'+match)
        // console.log(queryObj, queryStr)  

        //get = greater than or equal 
        // gt = greater than
        // lt = less than
        // lte = less than or equal 
        this.query.find(JSON.parse(queryStr))

        return this;
    }
    //Sorting items
    sorting() {
        if (this.queryString.sort)
        {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy);
        }
        else
        {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productController = {
    getProducts: async (req, res) => {
        try
        {
            const features = new APIfeatures(Product.find(), req.query)
                .filtering()
                .sorting()
                .paginating()
            const products = await features.query;
            return res.json({
                status: 'sucess',
                result: products.length,
                products: products
            })
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
            // const shop_id = await User.findOne({email: user.email})
            const { product_id, title, description, content, images, category, checked, sold, price } = req.body;
            if (!images)
            {
                return res.status(500).json({msg: 'No mage uploaded'})
            }
            const product = await Products.findOne({ product_id })
            if (product)
            {
                return res.status(500).json({msg: 'Product already in exist'})
            }
            const newProduct = new Product({
                product_id,
                title: title.toLowerCase(),
                description,
                content,
                images,
                category,
                checked,
                sold,
                price

            });

            await newProduct.save();
            return res.json({msg: 'A product created sucessfully'})
            
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
            await Product.findOneAndDelete(req.params.id);
            return res.json({msg: 'A product deleted'})
            
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
            const { title, description, content, images, category, checked, sold, price } = req.body;
            if (!images)
            {
                return res.status(500).json({msg: 'No mage uploaded'})
            }
            await Product.findOneAndUpdate({_id: req.params.id},{
                title: title.toLowerCase(),
                description,
                content,
                images,
                category,
                checked,
                sold,
                price
            })
            return res.json({msg: 'A product is updated'})
            
        } catch (err) {
            if (err)
            {
                return res.status(500).json({ msg: err.message });
            }
        }
    },
}

module.exports = productController;