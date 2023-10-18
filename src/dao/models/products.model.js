import  { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    thumbnails: {
        type: [String],
        required: false,
        default: [],
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

productsSchema.plugin(mongoosePaginate);


export const productsModel = model('Products', productsSchema);
