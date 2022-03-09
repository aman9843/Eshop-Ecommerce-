const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products')
const users = require('./data/users')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const User = require('./models/userModel')




dotenv.config({path: './config.env'});
require('./db/conn')




// importing data & destroying data

const importData = async () => {
    try{

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map((product) => {

           return {...product, user:adminUser}


        })

        await Product.insertMany(sampleProducts)
        console.log('Data Added')
        process.exit()

    } catch (error) {
        console.log(`there is an error ${error}`)
        process.exit(1);



    }
}

const destroyData = async () => {
    try{

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

       

        
        console.log('Data destroyed');
        process.exit()
        

    } catch (error) {
        console.log(`there is an error ${error}`)
        process.exit(1);



    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}


