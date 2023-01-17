import mongoose from "mongoose";
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import products from "./data/products.js";

dotenv.config()
connectDB()

const importData = async () =>{
    try {

    const sampleProducts = products.map((product) => {
      return { ...product, user: "63bc08930be3ca79e8efc4d7" }
    })
    await Product.insertMany(sampleProducts)
        console.log("Data inserted Successfully !!")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}




const distroyData = async () =>{
    try {        
        await Product.deleteMany()
        console.log("Data deleted Successfully !!")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    distroyData()
  } else {
    importData()
  }
  