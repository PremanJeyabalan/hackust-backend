const { uniq } = require("lodash")
const CATOBJECT = ['fruit', 'veg', 'poul', 'dairy', 'seafood', 'cereals', 'beverages' ]

function createBatch(categories, district) {
    const uniqueItems = [[],[],[],[],[],[],[]];
    const combinedItems = [[],[],[],[],[],[],[]];
    const uniqueCounter = [{},{},{},{},{},{},{}];

    categories.map((category, i) => {
        category.map((order, j) => {
            uniqueItems[i].push(order.itemId)
        })

        //finding all unique item_ids
        uniqueItems[i] = uniq(uniqueItems[i]);   
        //init uniqueItems and create object to return index by calling _id
        uniqueItems[i].map((item, j) => {
            uniqueCounter[i][item] = j;

            combinedItems[i][j] = {
                itemId: item,
                amount: 0,
                type: 'discrete',
                district,
                category: CATOBJECT[i],
            }
        })

        console.log(uniqueCounter)

        // fill uniqueItems
        category.map((order, j) => {
            if (uniqueItems.length > 0){
                if (combinedItems[i][uniqueCounter[i][order.itemId]].amount === 0){
                    combinedItems[i][uniqueCounter[i][order.itemId]].type = order.type;
                } 
                combinedItems[i][uniqueCounter[i][order.itemId]].amount += order.amount;
            }     
        })
    })
    
    return combinedItems

}

module.exports = {
    createBatch
}