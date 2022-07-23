const express = require('express');
const routes = express.Router();
const { warehouseModel, stockModel, productModel } = require("../models/models")

routes.post('/add', (req, res) => addModel(req, res))
routes.get('/viewAll', (req, res) => viewAllWarehouses(req, res))
routes.get('/details', (req, res) => warehouseDetails(req, res))

const addModel = async (req, res) => {
    try {
        const add = await warehouseModel(req.body).save();
        successResponse(res, add)
    } catch (err) {
        errResponse(res, err)
    }
}
const viewAllWarehouses = async (req, res) => {
    try {
        let warehouses = await warehouseModel.find();
        res.render('viewWarehouses', { warehouses })
    } catch (err) {
        errResponse(res, err)
    }
}
const warehouseDetails = async (req, res) => {
    try {
        let warehouseNumber = req.query.whnumber;
        let products = []
        let warehouse = await warehouseModel.findOne({ warehouse_number: warehouseNumber });
        let stocks = await stockModel.find({ warehouse_number: warehouseNumber });
        for (let value of stocks) {
            let productArr = await productModel.find({ product_id: value.product_id });
            products.push(productArr)
        }
        res.render("warehouseDetails", { warehouse, stocks, products })
    } catch (err) {
        errResponse(res, err)
    }
}
const successResponse = (res, data) => {
    res.json({ status: "success", data: data })
}
const errResponse = (res, err) => {
    res.json({ status: "Error", data: err })
}
module.exports = routes