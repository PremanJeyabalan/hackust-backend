const mongoose = require('mongoose')
const axios = require('axios');
const { MongoURL, MongoDBName, algoMicroserviceURL } = require('../config')
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
const Customer = require('../models/Customer.model');
const Item = require('../models/Item.model');
const Store = require('../models/Store.model');
const FeedbackModel = require('../models/Feedback.model');
const { result, omit } = require('lodash');
const { findOneAndUpdate } = require('../models/CustomerOrder.model');

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
            dbName: MongoDBName,
            useFindAndModify: false
        })

        const result = await Model.findByIdAndUpdate(id, {status: status},  {new: true});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createItems(employeeList) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        const result = Array();

        for (let item of employeeList) {
            item = JSON.stringify(item);
            item = JSON.parse(item)
            item = omit(item, ['_id'])
            const doc = Item(item);
            const value = await doc.save().then(doc => {return doc}); 
            result.push(value)
        }

        console.log(result)

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

        const result = await EmployeeOrder.findByIdAndUpdate(employeeOrderId, {$set: {employeeId, status: 'accepted'}},  {new: true});

        await mongoose.connection.close();

        return result;

    } catch (e) {
        throw e;
    }
}

async function getOrder(orderId, Model = CustomerOrder) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Model.findById(orderId);
        
        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}

async function updateEmployeeList(employeeList, employeeOrderId){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        
        const result = await EmployeeOrder.findByIdAndUpdate(employeeOrderId,  {employeeList: employeeList},  {new: true});
        console.log(result)
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

async function createStore({name, district}) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const store = Store({name, district});
        const result = await store.save().then(doc => {return doc});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createFeedback({ feedback }){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const data = Feedback({...feedback});
        const result = await data.save().then(doc => {return doc});

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

        const result = await Model.findByIdAndUpdate(id, {$set: {stars: score}},  {new: true});

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

        const result = await CustomerOrder.find({status: 'created', district}).sort({ _id: 1 }).limit(3);

        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}

async function updateEmployeeOrder(id, update, Model = EmployeeOrder){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Model.findByIdAndUpdate(id, {...update},  {new: true});

        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e
    }
}

async function solveCustomerOrder(batchId){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await CustomerOrder.find({customerBatchIds: batchId});

        for (order of result){
            let status = true;
            for (let i = 0; i < order.customerBatchIds.length; i++){
                const data = await getOrder(order.customerBatchIds[i], EmployeeOrder);
                if (data.status !== 'solved'){
                    status = false;
                }
            }
            if (status) {
                await updateStatus({status: 'solved', id: order._id, Model: CustomerOrder});
                await updateStatus({status: 'inactive', id: order._id, Model: Customer});
            }
        }

        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e
    }
}

async function emptyCollection(Model) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Model.deleteMany({});

        await mongoose.connection.close();

        return result;

    } catch (e) {
        throw e
    }
}

module.exports = {
    createOrder,
    updateStatus,
    createItems,
    getAllItems,
    acceptOrder,
    getOrder,
    updateEmployeeList,
    getAvailableOrder,
    createPerson,
    createStore,
    createFeedback,
    updateStars,
    getAllActiveOrdersDistrict,
    updateEmployeeOrder,
    solveCustomerOrder,
    emptyCollection,
}