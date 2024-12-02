const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: ""
    },
    company: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    photo: {},
    role: {
        type: [String],
        default: ["Buyer"],
        enum: ["Buyer", "Seller", "Admin"]
    },
    enquiredProperties: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }],
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad'
    }],
    resetCode: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)