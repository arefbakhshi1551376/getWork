import express from "express";
import {GenderAddVm, GenderDeleteVm, GenderUpdateVm} from "../utility/type/gender";
import {
    addNewGender,
    deleteExistGender, getAllGender, getCountOfGender,
    getGenderByFilter, getGenderById,
    getGenderByIdAndFilter, getGenderByTitle,
    updateExistGender
} from "../utility/coreMethod/gender";
import {defaultGenderMaker} from "../utility/maker";

export const genderRouter = express.Router()

genderRouter.get(
    `/`,
    async (req, res) =>
    {
        console.log('We are in add gender')
        await defaultGenderMaker()
        let genderList = await getAllGender()
        if (genderList != null)
        {
            return res.status(200).json(genderList)
        }
        else
        {
            return res.status(404).json({
                Message: `No gender found!`
            })
        }
    }
)

genderRouter.get(
    `/count`,
    async (req, res) =>
    {
        let genderCount = await getCountOfGender()
        if (genderCount != null)
        {
            return res.status(200).json(`Count of gender: ${genderCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No gender found!`
            })
        }
    }
)

genderRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentGender = await getGenderById(req.params.id)
        if (currentGender != null)
        {
            return res.status(200).json(currentGender)
        }
        else
        {
            return res.status(404).json({
                Message: `No gender found!`
            })
        }
    }
)

genderRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let genderList = await getGenderByFilter(req.params.filter)
        if (genderList != null)
        {
            return res.status(200).json(genderList)
        }
        else
        {
            return res.status(404).json({
                Message: `No gender found!`
            })
        }
    }
)

genderRouter.get(
    `/by_title/:title`,
    async (req, res) =>
    {
        let genderList = await getGenderByTitle(req.params.title)
        if (genderList != null)
        {
            return res.status(200).json(genderList)
        }
        else
        {
            return res.status(404).json({
                Message: `No gender found!`
            })
        }
    }
)

genderRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let genderList = await getGenderByIdAndFilter(req.params.id, req.params.filter)
        if (genderList != null)
        {
            return res.status(200).json(genderList)
        }
        else
        {
            return res.status(404).json({
                Message: `No gender found!`
            })
        }
    }
)

genderRouter.post(
    '/',
    async (req, res) =>
    {
        let currentGenderAddVm: GenderAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewGender(currentGenderAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentGenderAddVm.title} Added Successfully!`
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

genderRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentGenderUpdateVm: GenderUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistGender(currentGenderUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentGenderUpdateVm.title} Updated Successfully!`
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


genderRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentGenderDeleteVm: GenderDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistGender(currentGenderDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Gender Deleted Successfully!`
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


