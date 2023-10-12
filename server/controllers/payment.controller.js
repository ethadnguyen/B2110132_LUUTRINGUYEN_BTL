const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order.model');

const SHIPMENT = {
    normal: {
        price: 13.98,
        days: 7
    },
    fast: {
        price: 49.98,
        days: 3
    }
};

function shipmentPrice(shipmentOption) {
    let estimated = moment()
        .add(shipmentOption.days, "d")
        .format("dddd MMMM Do");

    return { estimated, price: shipmentOption.price };
}


const calculateShipment = (req, res) => {
    let shipment;

    if (req.body.shipment === "normal") {
        shipment = shipmentPrice(SHIPMENT.normal);
    }
    else {
        shipment = shipmentPrice(SHIPMENT.fast);
    }

    res.json({ success: true, shipment: shipment });
};

const makePayment = async (req, res) => {
    let totalPrice = Math.round(req.body.totalPrice * 100);
    try {
        const customer = await stripe.customers.create({ email: req.decoded.email });
        const source = await stripe.customers.createSource(customer.id, { source: "tok_visa" });
        const charge = await stripe.charges.create({
            amount: totalPrice,
            currency: "usd",
            customer: source.customer
        });

        let order = new Order();
        let cart = req.body.cart;

        cart.map(product => {
            order.products.push({
                productID: product._id,
                quantity: parseInt(product.quantity),
                price: product.price
            });
        });

        order.owner = req.decoded._id;
        order.estimateDelivery = req.body.estimateDelivery;

        await order.save();

        res.json({
            success: true,
            message: "Successfully made a payment",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    calculateShipment,
    makePayment
};