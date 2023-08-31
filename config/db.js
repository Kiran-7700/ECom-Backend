const mongoose=require("mongoose");


const connectDB=async ()=>{
    try{
        const uri="mongodb+srv://kiranchomule224:kiran7700@e-com.lhxgjau.mongodb.net/ecommerce"
     const conn=await mongoose.connect(uri)
     console.log(`connected to DB ${conn.connection.host}`);
    }catch(err){
        console.log(`Error connecting to database: ${err}`);
    }
}

module.exports={connectDB};
