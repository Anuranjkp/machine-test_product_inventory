const mongoose = require('mongoose');
const productModel = mongoose.model('product', {
    product_id:{type:String, required:true},
    productName:{type:String, required:true}
})
const warehouseModel = mongoose.model('warehouse', {
    warehouse_number:{type:Number, required:true},
    stock_limit:Number
})
const stockModel = mongoose.model('stock', {
    product_id:{type:String, required:true},
    warehouse_number:{type:Number, required:true},
    qty:{type:Number, required:true}
})
module.exports = {productModel, warehouseModel, stockModel}