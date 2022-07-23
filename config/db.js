const mongoose = require("mongoose");
const connectDB = async()=>{
    let db = process.env.DB;
    try{
        let connection = await mongoose.connect(db)
        console.log(`database connected in the port ${connection.connection.host}`)
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB