import express from 'express'
import morgan from "morgan";
import * as mongoose from "mongoose";
import {error_handler} from "./utility/error_handler";
import {BEFORE_LINK_V1} from "./utility/constant";
import {addressRouter} from "./router/address";
import {countryRouter} from "./router/country";
import {statusRouter} from "./router/status";
import {skillRouter} from "./router/skill";
import {defaultGenderMaker} from "./utility/maker";

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
app.use(error_handler)

app.use(`${BEFORE_LINK_V1}/address`, addressRouter)
app.use(`${BEFORE_LINK_V1}/country`, countryRouter)
app.use(`${BEFORE_LINK_V1}/status`, statusRouter)
app.use(`${BEFORE_LINK_V1}/skill`, skillRouter)

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

// await defaultGenderMaker()

app.listen(3000, () =>
{
    console.log("Sever is running!")
})