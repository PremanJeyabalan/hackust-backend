const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Location = require('./Location.model');

const optionsString = {
    type: String,
    required: true
}

const optionsNumber = {
    type: Number,
    required: true
}

const OrderModel = new Schema({
    customer: optionsString,
    employee: optionsString,
    store: optionsString,
    location: [Location.schema],
    customrPrice: optionsString
}, {timestamps: true})


module.exports = mongoose.model('Item', ItemModel);