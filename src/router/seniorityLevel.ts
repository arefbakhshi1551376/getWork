import express from "express";
import {
    addNewSeniorityLevel, deleteExistSeniorityLevel,
    getAllSeniorityLevel,
    getCountOfSeniorityLevel, getSeniorityLevelByFilter,
    getSeniorityLevelById, getSeniorityLevelByIdAndFilter, getSeniorityLevelByTitle, updateExistSeniorityLevel
} from "../utility/coreMethod/seniorityLevel";
import {SeniorityLevelAddVm, SeniorityLevelDeleteVm, SeniorityLevelUpdateVm} from "../utility/type/seniorityLevel";

export const seniorityLevelRouter = express.Router()

seniorityLevelRouter.get(
    `/`,
    async (req, res) =>
    {
        let seniorityLevelList = await getAllSeniorityLevel()
        if (seniorityLevelList != null)
        {
            return res.status(200).json(seniorityLevelList)
        }
        else
        {
            return res.status(404).json({
                Message: `No seniority level found!`
            })
        }
    }
)

seniorityLevelRouter.get(
    `/count`,
    async (req, res) =>
    {
        let seniorityLevelCount = await getCountOfSeniorityLevel()
        if (seniorityLevelCount != null)
        {
            return res.status(200).json(`Count of seniorityLevel: ${seniorityLevelCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No seniority level found!`
            })
        }
    }
)

seniorityLevelRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentSeniorityLevel = await getSeniorityLevelById(req.params.id)
        if (currentSeniorityLevel != null)
        {
            return res.status(200).json(currentSeniorityLevel)
        }
        else
        {
            return res.status(404).json({
                Message: `No seniority level found!`
            })
        }
    }
)

seniorityLevelRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let seniorityLevelList = await getSeniorityLevelByFilter(req.params.filter)
        if (seniorityLevelList != null)
        {
            return res.status(200).json(seniorityLevelList)
        }
        else
        {
            return res.status(404).json({
                Message: `No seniority level found!`
            })
        }
    }
)

seniorityLevelRouter.get(
    `/by_title/:title`,
    async (req, res) =>
    {
        let seniorityLevelList = await getSeniorityLevelByTitle(req.params.title)
        if (seniorityLevelList != null)
        {
            return res.status(200).json(seniorityLevelList)
        }
        else
        {
            return res.status(404).json({
                Message: `No seniority level found!`
            })
        }
    }
)

seniorityLevelRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let seniorityLevelList = await getSeniorityLevelByIdAndFilter(req.params.id, req.params.filter)
        if (seniorityLevelList != null)
        {
            return res.status(200).json(seniorityLevelList)
        }
        else
        {
            return res.status(404).json({
                Message: `No seniority level found!`
            })
        }
    }
)

seniorityLevelRouter.post(
    '/',
    async (req, res) =>
    {
        let currentSeniorityLevelAddVm: SeniorityLevelAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewSeniorityLevel(currentSeniorityLevelAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentSeniorityLevelAddVm.title} Added Successfully!`
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

seniorityLevelRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentSeniorityLevelUpdateVm: SeniorityLevelUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistSeniorityLevel(currentSeniorityLevelUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentSeniorityLevelUpdateVm.title} Updated Successfully!`
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


seniorityLevelRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentSeniorityLevelDeleteVm: SeniorityLevelDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistSeniorityLevel(currentSeniorityLevelDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `SeniorityLevel Deleted Successfully!`
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


