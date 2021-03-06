const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const path = require('path')
const {notFound,errorHandler} = require('./middleware/errorMiddleware');






//port app/ use
const port = 5000;
const app = express()




app.use(express.json())
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
app.use(cors());
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/uploads',uploadRoutes);


app.get('/api/config/paypal',(req,res)=> {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/uploads', express.static(path.join(__dirname,'/uploads')))







//imporitng config file for connection from conn 
dotenv.config({path: './config.env'});
require('./db/conn')

app.use(notFound);
app.use(errorHandler);


//home page
app.get('/',(req,res) => {
  res.send("Api is running");
} )









//listen port
app.listen(port,() => {
    console.log(`The port is running at ${port}`);
})





