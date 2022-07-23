require('dotenv').config()
const express = require("express");
const connectDB = require('./config/db');
const app = express();
const db = require("./config/db");
const path = require('path')
const bodyparser = require('body-parser')
connectDB()
app.use(bodyparser.urlencoded())
app.use(express.json())
app.use('/api/v1/product', require('./routes/product.routes'));
app.use('/api/v1/warehouse', require('./routes/warehouse.routes'));
app.use('/api/v1/stock', require("./routes/stock.routes"));

// view engine setup
app.set('views', path.join(__dirname, "views"))
app.set("view engine", 'hbs')

app.use(express.static(path.join(__dirname, 'public')))
app.listen(2000,()=>{
    console.log("server started successfuly")
})