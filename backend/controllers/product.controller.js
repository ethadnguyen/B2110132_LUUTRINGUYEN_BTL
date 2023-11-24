const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find()
            .populate("owner category")
            .populate("reviews", "rating")
            .exec();
        res.json({
            success: true,
            products: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        let product = await Product.findOne({
            _id: req.params.id
        })
            .populate("owner category")
            .populate("reviews", "rating")
            .exec();
        res.json({
            success: true,
            product: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        let product = new Product();
        product.owner = req.body.ownerID;
        product.category = req.body.categoryID;
        product.price = req.body.price;
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        await product.save(); // async

        res.json({
            status: true,
            message: "Successfully saved"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title || product.title,
                price: req.body.price || product.price,
                category: req.body.categoryID || product.categoryID,
                photo: req.file.location || product.photo,
                stockQuantity: req.body.stockQuantity || product.stockQuantity,
                description: req.body.description || product.description,
                owner: req.body.ownerID || product.ownerID
            }
        }, {
            upsert: true
        });

        res.json({
            success: true,
            updatedProduct: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({
            _id: req.params.id
        });

        if (deletedProduct) {
            res.json({
                status: true,
                message: "Successfully deleted"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};