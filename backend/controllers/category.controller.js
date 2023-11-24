const Category = require("../models/category.model");

const createCategory = async (req, res) => {
    try {
        const category = new Category();
        category.type = req.body.type;

        await category.save();

        res.json({
            success: true,
            message: "Successfully created a new category"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        res.json({
            success: true,
            categories: categories,
        });
    }
    catch (err) {
        res.status.json({
            success: false,
            message: err.message,
        })
    }
};

const deleteCategory = async (req, res) => {
    try {
        let deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (deletedCategory) {
            res.json({
                success: true,
                message: "Successfully deleted"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
};