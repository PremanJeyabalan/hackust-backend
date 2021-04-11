const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsString = {
    type: String,
    required: true
}

const optionsNumber = {
    type: Number,
    required: true
}

const optionsEnumType = {
    type: String,
    required: true,
    enum: ['discrete', 'kg', 'g'],
    default: 'discrete'
}

const ItemModel = new Schema({
    name: optionsString,
    stars: optionsNumber,
    amount: optionsNumber,
    store: optionsString,
    price: optionsNumber,
    type: optionsEnumType
}, {timestamps: true})


module.exports = mongoose.model('Item', ItemModel);

