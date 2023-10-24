const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
        trim: true,
        minlength: 8
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    status: {
        type: String,
        default: 'active'
    },
}, {timestamps: true});

export const usersModel = model('User', userSchema);