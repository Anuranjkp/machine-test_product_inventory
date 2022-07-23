const express = require("express");
const routes = express.Router()
const { stockModel } = require("../models/models")

routes.post('/add', (req, res) => addModel(req, res));
routes.post('/unstock', (req, res) => unstockModel(req, res));

const addModel = async (req, res) => {
    try {
        let add = await stockModel(req.body).save();
        successResponse(res, add)
    } catch (err) {
        errResponse(res, err)
    }
}
const unstockModel = async (req, res) => {
    try {
        let product = req.body.product_id;
        let qty = req.body.unstock_qty
        let newQty;
        let stockDb = await stockModel.findOne({ product_id: product })
        if (stockDb) {
            if (stockDb.qty >= qty) {
                newQty = stockDb.qty - qty
                stockDb.qty = newQty
            }
        }
        let update = await stockModel.findByIdAndUpdate(stockDb._id, stockDb)
        successResponse(res, update)
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