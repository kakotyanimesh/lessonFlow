const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const { userRouter } = require('./routes/user.router')
const { lessonRouter } = require('./routes/lesson.router')

const app = express()
const port = 3004

const corsOptions = {
    origin : ['https://lesson-flow.vercel.app', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Set-Cookie']
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())



app.use('/api/v1/user', userRouter)
app.use('/api/v1/lesson', lessonRouter)


const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`app connected to mongoDb datbase `);
        
    } catch (error) {
        console.log(`error while connecting to MongoDb url : ${error.message}`);
        
    }
}


app.listen(port, () => {
    main()
    console.log(`the app is running at http://localhost:${port}`);
    
})