const express=require("express");
const cors =require("cors")
const { connectDB } = require("./config/db");
const {router}=require("./routes/authRoute")
const {categoryRouter}=require("./routes/categoryRoutes")
const {productRouter}=require("./routes/productRoutes")

const app=express();
connectDB();
app.use(express.json())
app.use(cors({
    origin:"*" 
}))

app.use("/api",router)
app.use("/api/category",categoryRouter)
app.use("/api/product",productRouter)

app.get("/",(req,res)=>{
    res.send("Hello")
})

const port=5001;

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})