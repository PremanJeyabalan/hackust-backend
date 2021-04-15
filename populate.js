const helper = require("./helpers/mongo")
//assuming price is 5 dollar for avg
const pricingGeneratrion = (price, buyingPower) => {

    return (price*(1-buyingPower) + Math.random()*price);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const itemIds = [['0', '1'], ['2', '3'], ['4' , '5'], ['6', '7'], ['8', '9'], ['10', '11'], ['12', '13']]

const typeFood = ['fruit', 'veg', 'poul', 'dairy', 'seafood', 'cereals', 'beverages'];
const type = ['discrete', 'kg']
const storeIds = ['607594b7b77037675c395cfe', '607594c4b77037675c395cff', '6076f50446b1b73a7073014c', '6076f50e46b1b73a7073014d']
const district = ['Mongkok', 'Causeway Bay']
const employeeId = ['60759340913c1765b800a079','6076f60d96f760516896ca4c', '6076f6b8ddc1145c187de177', '6076f6ccddc1145c187de178']

const fullData = []
for(let i = 0; i < employeeId.length; i++){
    const buyingPower = Math.random();
    for(let j = 0; j < 2500; j++){
        const food = getRandomInt(typeFood.length);
        let data = {
            itemId: itemIds[food][j%2],
            amount: 1,
            type: type[j%2],
            price: pricingGeneratrion(5, buyingPower),
            category: typeFood[food],
            employeeId: employeeId[j%4],
            storeId: storeIds[j%4],
            district : district[j%2]
        }
        console.log(itemIds[food][j%2], j%2, food)
        fullData.push(data)
    }
}

// console.log(fullData)

helper.createItems(fullData).catch(err => console.log(err));
