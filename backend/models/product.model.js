const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        owner: { type: Schema.Types.ObjectId, ref: "Owner" },
        title: String,
        description: String,
        photo: String,
        price: Number,
        stockQuantity: Number,
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        createdAt: { type: Date, default: Date.now }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

ProductSchema.virtual("averageRating").get(function () {
    if (this.reviews.length > 0) {
        let sum = this.reviews.reduce((total, review) => {
            return total + review.rating;
        }, 0);
        return sum / this.reviews.length;
    }

    return 0;
});

ProductSchema.virtual("formattedCreatedAt").get(function () {
    return moment(this.createdAt).format("DD-MM-YYYY");
});

module.exports = mongoose.model("Product", ProductSchema);
