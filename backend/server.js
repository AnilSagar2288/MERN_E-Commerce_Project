import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import products from './data/products.js'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import bodyParser from 'body-parser'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
const PORT = process.env.PORT || 5000
const app = express();
dotenv.config();
connectDB()

app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)


app.get('/api/cogfig/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))



app.use(notFound)

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})