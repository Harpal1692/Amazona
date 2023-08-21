const mongoose = require("mongoose");

class UserModel{
    constructor(){
        this.schema = new mongoose.Schema({
            FirstName:{type:String,required:true},
            LastName:{type:String,required:true},
            email:{type:String,required:true, unique:true},
            phone:{type:String,default:null},
            password:{type:String,required:true},
            isAdmin:{type:Boolean,default:false},
        },{
            timestamps:true
        })

        
    }


}


const user = new UserModel()

const userModel = mongoose.model("table_users",user.schema)

module.exports = userModel