import express from "express";
import {
    addNewCity, deleteExistCity,
    getAllCity,
    getCityByFilter,
    getCityById,
    getCityByIdAndFilter,
    getCountOfCity, updateExistCity
} from "../utility/coreMethod/city";
import {CityAddVm, CityDeleteVm, CityUpdateVm} from "../utility/type/city";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const cityRouter = express.Router()

cityRouter.get(
    `/`,
    async (req, res) =>
    {
        let cityList = await getAllCity()
        if (cityList != null)
        {
            return res.status(200).json(cityList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

cityRouter.get(
    `/count`,
    async (req, res) =>
    {
        let cityCount = await getCountOfCity()
        if (cityCount != null)
        {
            return res.status(200).json(`Count of city: ${cityCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

cityRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let cityList = await getCityByFilter(req.params.filter)
        if (cityList != null)
        {
            return res.status(200).json(cityList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

cityRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let cityList = await getCityByIdAndFilter(req.params.id, req.params.filter)
        if (cityList != null)
        {
            return res.status(200).json(cityList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

cityRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentCity = await getCityById(req.params.id)
        if (currentCity != null)
        {
            return res.status(200).json(currentCity)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

cityRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCityAddVm: CityAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            state: req.body.state,
            title: req.body.title
        }
        let result: boolean | null = await addNewCity(currentCityAddVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

cityRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCityUpdateVm: CityUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            state: req.body.state,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistCity(currentCityUpdateVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)


cityRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentCityDeleteVm: CityDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistCity(currentCityDeleteVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)


