const Product = require('../models/product.model');
const search = async (req, res) => {
    const { title } = req.body;
    console.log(title);
    try {
        const products = await Product.find({
            title: { $regex: new RegExp(title, 'i') }
        })
            .populate('owner')
            .exec();

        const formattedProducts = products.map(product => ({
            _id: product._id,
            title: product.title,
            photo: product.photo,
            description: product.description,
            price: product.price,
            rating: product.reviews.length > 0 ? product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length : 0,
            averageRating: product.averageRating,
            owner: {
                _id: product.owner._id,
                name: product.owner.name,
            }
        }));
        console.log('formattedProducts ', formattedProducts);
        res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { search };