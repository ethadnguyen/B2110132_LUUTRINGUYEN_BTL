const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = 3001;

dotenv.config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('open', () => {
    console.log('Connected to the database');
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const OwnerRoutes = require('./routes/owner.route');
const CategoryRoutes = require('./routes/category.route');
const OrderRoutes = require('./routes/order.route');
const AddressRoutes = require('./routes/address.route');
const searchRoutes = require('./routes/search.route');
const reviewRoutes = require('./routes/review.route');
const paymentRoutes = require('./routes/payment.route');
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', OwnerRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', OrderRoutes);
app.use('/api', AddressRoutes);
app.use('/api', searchRoutes);
app.use('/api', reviewRoutes);
app.use('/api', paymentRoutes);
app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});
