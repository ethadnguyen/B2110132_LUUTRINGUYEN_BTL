const Order = require('../models/order.model');

const getOrders = async (req, res) => {
    try {
        let products = await Order.find({ owner: req.decoded._id })
            .deepPopulate("owner products.productID.owner")
            .exec();

        res.json({
            success: true,
            products: products
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        let deletedOrder = await Order.remove({ owner: req.decoded._id });
        if (deletedOrder) {
            res.json({
                success: true,
                message: "Successfully deleted order"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getOrders,
    deleteOrder
};