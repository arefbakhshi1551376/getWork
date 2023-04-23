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
import {careerHistoryRouter} from "./router/careerHistory";
import {stateRouter} from "./router/state";
import {cityRouter} from "./router/city";
import {categoryRouter} from "./router/category";
import {languageRouter} from "./router/language";
import {jobTimeRouter} from "./router/jobTime";
import {jobPlaceRouter} from "./router/jobPlace";
import {genderRouter} from "./router/gender";
import {companyRouter} from "./router/company";
import bodyParser from "body-parser";
import {introductionRouter} from "./router/introduction";
import {degreeRouter} from "./router/degree";
import {languageLevelRouter} from "./router/languageLevel";
import {skillLevelRouter} from "./router/skillLevel";

const app = express()

app.use((req, res, next) =>
{
    // let start = Date.now()
    // console.log(`${req.method} - ${req.url}`)
    next()
    // console.log(`Time: ${Date.now() - start} ms`)
})

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))
app.use('/src/public/upload', express.static(__dirname + '/src/public/upload'));
app.use(error_handler)

app.use(`${BEFORE_LINK_V1}/address`, addressRouter)
app.use(`${BEFORE_LINK_V1}/country`, countryRouter)
app.use(`${BEFORE_LINK_V1}/status`, statusRouter)
app.use(`${BEFORE_LINK_V1}/skill`, skillRouter)
app.use(`${BEFORE_LINK_V1}/careerHistory`, careerHistoryRouter)
app.use(`${BEFORE_LINK_V1}/state`, stateRouter)
app.use(`${BEFORE_LINK_V1}/city`, cityRouter)
app.use(`${BEFORE_LINK_V1}/category`, categoryRouter)
app.use(`${BEFORE_LINK_V1}/language`, languageRouter)
app.use(`${BEFORE_LINK_V1}/jobTime`, jobTimeRouter)
app.use(`${BEFORE_LINK_V1}/jobPlace`, jobPlaceRouter)
app.use(`${BEFORE_LINK_V1}/gender`, genderRouter)
app.use(`${BEFORE_LINK_V1}/company`, companyRouter)
app.use(`${BEFORE_LINK_V1}/introduction`, introductionRouter)
app.use(`${BEFORE_LINK_V1}/degree`, degreeRouter)
app.use(`${BEFORE_LINK_V1}/languageLevel`, languageLevelRouter)
app.use(`${BEFORE_LINK_V1}/skillLevel`, skillLevelRouter)

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