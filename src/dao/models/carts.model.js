import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
});

cartsSchema.plugin(mongoosePaginate)

cartsSchema.pre('find', function () {
    this.populate('products.product');
});

cartsSchema.pre('findById', function () {
    this.populate('products.product');
});

cartsSchema.pre('findOne', function () {
    this.populate('products.product');
});

export const cartsModel = mongoose.model('Carts', cartsSchema);

