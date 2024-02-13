const express = require('express');
const mongoose = require('mongoose')
const router = require('./router.js')
const Post = require('./User.js')
const cors = require('cors');
const serverless = require('serverless-http');




const PORT = 5000;
const DB_URL = 'mongodb+srv://bob:bob@task4.ibmvypw.mongodb.net/?retryWrites=true&w=majority'

const app = express()


app.use(cors());
app.use(express.json())
app.use('/api' , router)


async function startApp(){
    try{
        await mongoose.connect(DB_URL)

        app.listen(PORT , ()=> console.log('Server started ' + PORT ))

    }catch (e){
        console.log(e)
    }
}
startApp()
module.exports.handler= serverless(app)


