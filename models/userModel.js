const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        trim:true
    },
    email:{
        type: String ,
        unique : true, 
        required:true
        },
    password:{
        type:String,
        required:true
    } ,   
    phone:{
        type:Number,
        required:true
    },
    answer:{
      type:String,
      required:true
    },
    role:{
        type:Number,
        default:0 
    }

},{timestamps:true})

module.exports=mongoose.model("users", userSchema);