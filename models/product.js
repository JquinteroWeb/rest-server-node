const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
});

productSchema.methods.toJSON = function () {
    const { __v, _id, status, ...product } = this.toObject();
    product.uid = _id
    return product;
}


const Product = model('Product', productSchema);
module.exports = Product;