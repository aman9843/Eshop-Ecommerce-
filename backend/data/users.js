const bycrypt = require('bcryptjs')

const users = [
    {
        name:'Admin',
        email:'admin@gmail.com',
        password:bycrypt.hashSync('123456',10),
        cpassword:bycrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Aman',
        email:'aman@gmail.com',
        password:bycrypt.hashSync('123456',10),
        cpassword:bycrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'damon',
        email:'damon@gmail.com',
        password:bycrypt.hashSync('123456',10),
        cpassword:bycrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'john snow',
        email:'klaus@gmail.com',
        password:bycrypt.hashSync('123456',10),
        cpassword:bycrypt.hashSync('123456',10),
        isAdmin:true
    },
]

module.exports = users;