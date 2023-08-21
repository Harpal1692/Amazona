
const mongoose = require("mongoose")

const connectDb = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amazona');
        console.log("db connected")
    } catch (error) {
        console.log(object);
        console.log("db connection loss");
        
    }
}
module.exports =  connectDb