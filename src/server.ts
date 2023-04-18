import express from 'express'
import morgan from "morgan";
import * as mongoose from "mongoose";

const app = express()

app.use((req, res, next) =>
{
    // let start = Date.now()
    // console.log(`${req.method} - ${req.url}`)
    next()
    // console.log(`Time: ${Date.now() - start} ms`)
})

app.use(express.json())
app.use(morgan('tiny'))
const connectionString = 'mongodb://127.0.0.1:27017/GetWork'
mongoose.connect(connectionString)
    .then(r =>
    {
        console.log('Connected!');
        console.log(`${r}`)
    })
    .catch(() =>
    {
        console.log('Error while connecting to database!')
    }); // Start mongodb server: mongod -dbpath C:\Program Files\MongoDB

app.listen(3000, () =>
{
    console.log("Sever is running!")
})