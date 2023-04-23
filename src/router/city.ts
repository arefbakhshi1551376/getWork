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
            return res.status(404).json({
                Message: `No city found!`
            })
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
            return res.status(404).json({
                Message: `No city found!`
            })
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
            return res.status(404).json({
                Message: `No city found!`
            })
        }
    }
)

cityRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let cityList = await getCityByFilter(req.params.filter)
        if (cityList != null)
        {
            return res.status(200).json(cityList)
        }
        else
        {
            return res.status(404).json({
                Message: `No city found!`
            })
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
            return res.status(404).json({
                Message: `No city found!`
            })
        }
    }
)

cityRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCityAddVm: CityAddVm = {
            state: req.body.state,
            title: req.body.title,
        }
        let result: boolean | null = await addNewCity(currentCityAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentCityAddVm.title} Added Successfully!`
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

cityRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCityUpdateVm: CityUpdateVm = {
            id: req.params.id,
            state: req.body.state,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistCity(currentCityUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentCityUpdateVm.title} Updated Successfully!`
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
            return res.status(200).json({
                Message: `City Deleted Successfully!`
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


