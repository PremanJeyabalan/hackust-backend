const mongoose = require('mongoose')
const axios = require('axios');
const { MongoURL, MongoDBName, algoMicroserviceURL } = require('../config')
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
const Customer = require('../models/Customer.model');
const Item = require('../models/Item.model');
const Store = require('../models/Store.model');
const FeedbackModel = require('../models/Feedback.model');

async function createOrder(data, Model) {
    try {

        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const order = new Model({...data});

        const result = await order.save().then(doc => {return doc})

        await mongoose.connection.close()

        return result;

    } catch (e) {
        throw e;
    }

}

async function updateStatus({status, id, Model}) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Model.findByIdAndUpdate(id, {$set: {currentOrder: status}});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createItems(customerList) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        const result = Array();

        for (let item of customerList) {
            const doc = Item({...item});
            result.push(await doc.save().then(doc => {return doc})); 
        }

        await mongoose.connection.close();

        return result

    } catch (e) {
        throw e;
    }
}

async function getAllItems() {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Item.find({});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function acceptOrder(employeeOrderId, employeeId) {
    try {

        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await EmployeeOrder.findByIdAndUpdate(employeeOrderId, {$set: {employeeId, status: 'accepted'}});

        await mongoose.connection.close();

        return result;

    } catch (e) {
        throw e;
    }
}

async function getOrder(orderId) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await CustomerOrder.findById(orderId);
        
        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}

async function addPrice(employeeList, orderId){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        const order = await getOrder(orderId);

        const empList = {...order.employeeList, employeeList};
        const result = await CustomerOrder.findByIdAndDelete(orderId, {$set: {employeeList: empList}});

        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}

async function getAvailableOrder() {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await EmployeeOrder.find({status: 'created'}).sort({id: 1}).limit(1);
        
        await mongoose.connection.close();

        return result;
    } catch {
        throw e;
    }
}

async function createPerson(name, Model) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        console.log(name, "is here!");

        const person = Model({name : name});
        console.log("model made")
        const result = await person.save().then(doc => {return doc}).catch(err => console.log(err));

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createStore({name, latitude, longitude}) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const store = Store({name, latitude, longitude});
        const result = await store.save().then(doc => {return doc});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createFeedback({ customerId, target, stars }){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const feedback = Feedback({customerId, target, stars });
        const result = await feedback.save().then(doc => {return doc});

        await mongoose.connection.close();
        return result;
    } catch (e) {
        throw e;
    }
}

async function updateStars({ id, Model }){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        let score = 0;
        const feedbacks = await Feedback.find({target: id});
        let count = feedbacks.length;

        for (let feedback of feedbacks){
            score += feedback.stars
        }

        score = score / count

        const result = await Model.findByIdAndUpdate(id, {$set: {stars: score}});

        await mongoose.connection.close();
        return result;
    } catch (e) {
        throw e;
    }
}

async function getAllActiveOrdersDistrict(district){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await CustomerOrder.find({status: 'active', district}).sort({ _id: 1 }).limit(3);

        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}



module.exports = {
    createOrder,
    updateStatus,
    createItems,
    getAllItems,
    acceptOrder,
    getOrder,
    addPrice,
    getAvailableOrder,
    createPerson,
    createStore,
    createFeedback,
    updateStars,
    getAllActiveOrdersDistrict
}