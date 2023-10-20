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
            }
        }
    ],
    // No es necesario especificar `default: []` ya que por defecto será un array vacío.
},
    { timestamps: true }
);

// Middleware para población de 'products.product'
cartsSchema.pre(['find', 'findOne', 'findOneAndUpdate', 'findById'], function () {
    this.populate('products.product');
});

cartsSchema.plugin(mongoosePaginate)



export const cartsModel = model('Carts', cartsSchema);

