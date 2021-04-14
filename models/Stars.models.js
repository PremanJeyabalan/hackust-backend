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

const optionsCategoryType = {
    type: String,
    required: true,
    enum: ['fruit', 'veg', 'poul', 'dairy', 'seafood', 'cereals', 'beverages']
}

const StarsModel = Schema({
    category: optionsCategoryType,
    stars: optionsNumber
})

module.exports = mongoose.model('Stars', StarsModel);