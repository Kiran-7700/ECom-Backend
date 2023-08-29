const bcrypt=require("bcrypt");

const hashPassword=async(password)=>{
    try{
        const saltRound=10;
        const hashPassword=await bcrypt.hash(password,saltRound)
        return hashPassword;
    }catch(err){
        console.log(`${err}`);
    }
}
const comparePassword=async(password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword)
}

module.exports={hashPassword,comparePassword}