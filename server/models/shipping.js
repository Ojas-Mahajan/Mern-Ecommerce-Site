const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShippingSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    method: {
        type: String,
        enum: ['Standard', 'Express'],
        default: 'Standard'
    },
}, { timestamps: true });

module.exports = mongoose.model('Shipping', ShippingSchema);
