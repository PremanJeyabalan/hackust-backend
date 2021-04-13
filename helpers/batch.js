const { uniq } = require("lodash")
const CATOBJECT = {fruit : 0, veg: 1, poul: 2, dairy: 3, seafood: 4, cereals: 5, beverages: 6 } ;

function createBatch(categories, district) {
    const uniqueItems = [[],[],[],[],[],[],[]]
    const combinedItems = uniqueItems;
    const uniqueCounter = [{},{},{},{},{},{},{}];

    categories.map((category, i) => {
        category.map((order, j) => {
            uniqueItems[i].push(order._id)
        })

        //finding all unique item_ids
        uniqueItems[i] = uniq(uniqueItems[i]);

        //init uniqueItems and create object to return index by calling _id
        uniqueItems[i].map((item, j) => {
            uniqueCounter[i][item] = j;

            combinedItems[i][j] = {
                _id: item,
                amount: 0,
                type: 'discrete',
                district,
                category: CATOBJECT[i]
            }
        })

        // fill uniqueItems
        category.map((order, j) => {
            if (combinedItems[i][uniqueCounter[i][order._id]].amount === 0){
                combinedItems[i][uniqueCounter[i][order._id]].type = order.type;
            }

            combinedItems[i][uniqueCounter[i][order._id]].amount += order.amount;
        })
    })

    return combinedItems

}

module.exports = {
    createBatch
}