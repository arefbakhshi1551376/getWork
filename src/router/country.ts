import express from "express";
import {modelsName, whatHappened} from "../utility/constant";
import {
    addNewCountry,
    deleteExistCountry,
    getAllCountry,
    getCountOfCountry, getCountryByFilter,
    updateExistCountry
} from "../utility/coreMethod/country";
import {showMessageForEveryThing} from "../utility/showResponseMessage";
import {CountryAddVm, CountryDeleteVm, CountryUpdateVm} from "../utility/type/country";

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
            return showMessageForEveryThing(res, 404, modelsName.Country, whatHappened.Found)
        }
    }
)

countryRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let countryList = await getCountryByFilter(req.params.filter)
        if (countryList != null)
        {
            return res.status(200).json(countryList)
        }
        else
        {
            return showMessageForEveryThing(res, 404, modelsName.Country, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.Country, whatHappened.Found)
        }
    }
)

countryRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCountryAddVm: CountryAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewCountry(currentCountryAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentCountryAddVm.title} Added Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

countryRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCountryUpdateVm: CountryUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistCountry(currentCountryUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentCountryUpdateVm.title} Updated Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
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
            return res.status(200).json({
                Message: `Country Deleted Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)


