import express from "express";
import {
    addNewCountry,
    deleteExistCountry,
    getAllCountry,
    getCountOfCountry, getCountryByFilter, getCountryById, getCountryByIdAndFilter,
    updateExistCountry
} from "../utility/coreMethod/country";
import {CountryAddVm, CountryDeleteVm, CountryUpdateVm} from "../utility/type/country";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const countryRouter = express.Router()

countryRouter.get(
    `/`,
    async (req, res) =>
    {
        let countryList = await getAllCountry()
        if (countryList != null)
        {
            return res.status(200).json(countryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

countryRouter.get(
    `/count`,
    async (req, res) =>
    {
        let countryCount = await getCountOfCountry()
        if (countryCount != null)
        {
            return res.status(200).json(`Count of country: ${countryCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

countryRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let countryList = await getCountryByFilter(req.params.filter)
        if (countryList != null)
        {
            return res.status(200).json(countryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

countryRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let countryList = await getCountryByIdAndFilter(req.params.id, req.params.filter)
        if (countryList != null)
        {
            return res.status(200).json(countryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

countryRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentCountry = await getCountryById(req.params.id)
        if (currentCountry != null)
        {
            return res.status(200).json(currentCountry)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

countryRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCountryAddVm: CountryAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: req.body.title
        }
        let result: boolean | null = await addNewCountry(currentCountryAddVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)

countryRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCountryUpdateVm: CountryUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistCountry(currentCountryUpdateVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)


countryRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentCountryDeleteVm: CountryDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistCountry(currentCountryDeleteVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)


