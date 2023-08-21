const mongoose = require("mongoose")

class ProductModel{

    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String , required:true},
            image:{type:String , required:true},
            category:{type:String , required:true},
            alias:{type:String , required:true, unique:true},
            price:{type:Number , required:true},
            brand:{type:String , required:true},
            rating:{type:Number , required:true},
            countInstock:{type:Number , required:true},
            numReviews:{type:Number , required:true},
            description:{type:String , required:true},
        })
    }

}


const product =new ProductModel()
const productModel = mongoose.model("product",product.schema)

module.exports = productModel