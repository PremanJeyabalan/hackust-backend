const mongoose = require('mongoose');
const Stars = require('./Stars.models');
const Schema = mongoose.Schema;

const optionsString = {
    type: String,
    required: true
}

const optionsNumber = {
    type: Number,
    required: true
}

const FeedbackModel = Schema({
    customerId: optionsString,
    customerOrderId: optionsString,
    starObject: [Stars.schema]
})

module.exports = mongoose.model('Feedback', FeedbackModel);

// employeeList: [
//     {
//         _id: "blah",
//         itemId: "blah",
//         amount: 15,
//         type: 'discrete',
//         dsitrict: "Mongkok",
//     }
// ]