import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    birth_date: {
        type: Date,
        required: false,
    },
    password: {
        type: String,
        required:true,
        trim: true,
        minlength: 8,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts',
        required: true
    },
    status: {
        type: String,
        default: 'active'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    from_github: {
        type: Boolean,
        default: false
    },
    from_google: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

// Middleware para población de 'products.product'
userSchema.pre(['find', 'findOne', 'findOneAndUpdate', 'findById'], function () {
    this.populate('cart');
});



export const usersModel = model('User', userSchema);