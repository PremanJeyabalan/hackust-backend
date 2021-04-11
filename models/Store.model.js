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

const StoreModel = new Schema({
    name: optionsString,
    stars: optionsNumber,
})


module.exports = mongoose.model('Store', StoreModel);