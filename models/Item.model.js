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

const ItemModel = new Schema({
    name: optionsString,
    stars: optionsNumber,
    store: optionsString,

}, {timestamps: true})


module.exports = mongoose.model('Item', ItemModel);