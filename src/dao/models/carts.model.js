import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsSchema = Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            _id: false
        }
    ],
},
    { timestamps: true }
);


// Middleware para paginación
cartsSchema.plugin(mongoosePaginate)


export const cartsModel = model('Carts', cartsSchema);

