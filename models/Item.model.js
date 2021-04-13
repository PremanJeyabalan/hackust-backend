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

const optionsCategoryType = {
    type: String,
    required: true,
    enum: ['fruit', 'veg', 'poul', 'dairy', 'seafood', 'cereals', 'beverages']
}

const ItemModel = new Schema({
    name: optionsString,
    amount: optionsNumber,
    type: optionsEnumType,
    price: optionsNumber,
    category: optionsCategoryType,
    employeeId: optionsString,
    storeId: optionsString
}, {timestamps: true})


module.exports = mongoose.model('Item', ItemModel);

