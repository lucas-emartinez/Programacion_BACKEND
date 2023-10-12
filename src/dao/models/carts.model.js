import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
});

export const cartsModel = mongoose.model('Carts', cartsSchema);

