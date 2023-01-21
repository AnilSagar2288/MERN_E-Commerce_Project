import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
// import products from './data/products.js'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import bodyParser from 'body-parser'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
const PORT = process.env.PORT || 5000
const app = express();
dotenv.config();
connectDB()

app.use(cors())

if(process.env.NODE_ENV ==="development"){
    app.use(morgan('dev'))
}


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)
app.use('/api/upload',uploadRoute)


app.get('/api/cogfig/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname =path.resolve()
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname,'/frontend/build')))
//     app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'frontend', 'build','index.html')))
// }else{
//     app.get('/', (req,res)=>{
//         res.send('API is running')
//     })
// }

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})