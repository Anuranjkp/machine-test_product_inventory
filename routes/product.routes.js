const express = require("express");
const res = require("express/lib/response");
const async = require("hbs/lib/async");
const routes = express.Router()
const { productModel } = require('../models/models');

routes.post('/add', (req, res) => addProduct(req, res));
routes.get('/viewAll', (req, res) => viewAllProducts(req, res))
routes.delete('/remove', (req, res) => deleteProduct(req, res))
routes.patch('/update', (req, res) => updateProduct(req, res))

const addProduct = async (req, res) => {
    try {
        const uploadData = await productModel(req.body).save();
        successResponse(res, uploadData)
    } catch (err) {
        if (err) {errResponse(res, err)}
    }
}
const deleteProduct = async (req, res) => {
    try{
        let remove = await productModel.findByIdAndRemove(req.query.id)
    successResponse(res, remove)
    }catch(err){
        errResponse(res,err)
    } 
}
const viewAllProducts = async (req, res) => {
    try{
        let products = await productModel.find();
        res.render('viewProducts', { products })
    }catch(err){
        errResponse(res,err)
    }
}
const updateProduct = async (req, res) => {
    try {
        let update = await (await productModel.findByIdAndUpdate(req.query.id, req.body)).save();
        successResponse(res, update)
    } catch (err) {
        errResponse(res,err)
    }
}
const successResponse = (res, data) => {
    res.json({ status: "success", data: data })
}
const errResponse = (res, err) => {
    res.json({ status: "Error", data: err })
}

module.exports = routes