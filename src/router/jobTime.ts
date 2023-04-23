import express from "express";
import {
    addNewJobTime, deleteExistJobTime,
    getAllJobTime,
    getCountOfJobTime,
    getJobTimeByFilter,
    getJobTimeById,
    getJobTimeByIdAndFilter, updateExistJobTime
} from "../utility/coreMethod/jobTime";
import {JobTimeAddVm, JobTimeDeleteVm, JobTimeUpdateVm} from "../utility/type/jobTime";

export const jobTimeRouter = express.Router()

jobTimeRouter.get(
    `/`,
    async (req, res) =>
    {
        let jobTimeList = await getAllJobTime()
        if (jobTimeList != null)
        {
            return res.status(200).json(jobTimeList)
        }
        else
        {
            return res.status(404).json({
                Message: `No job time found!`
            })
        }
    }
)

jobTimeRouter.get(
    `/count`,
    async (req, res) =>
    {
        let jobTimeCount = await getCountOfJobTime()
        if (jobTimeCount != null)
        {
            return res.status(200).json(`Count of job time: ${jobTimeCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No job time found!`
            })
        }
    }
)

jobTimeRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentJobTime = await getJobTimeById(req.params.id)
        if (currentJobTime != null)
        {
            return res.status(200).json(currentJobTime)
        }
        else
        {
            return res.status(404).json({
                Message: `No job time found!`
            })
        }
    }
)

jobTimeRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let jobTimeList = await getJobTimeByFilter(req.params.filter)
        if (jobTimeList != null)
        {
            return res.status(200).json(jobTimeList)
        }
        else
        {
            return res.status(404).json({
                Message: `No job time found!`
            })
        }
    }
)

jobTimeRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let jobTimeList = await getJobTimeByIdAndFilter(req.params.id, req.params.filter)
        if (jobTimeList != null)
        {
            return res.status(200).json(jobTimeList)
        }
        else
        {
            return res.status(404).json({
                Message: `No job time found!`
            })
        }
    }
)

jobTimeRouter.post(
    '/',
    async (req, res) =>
    {
        let currentJobTimeAddVm: JobTimeAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewJobTime(currentJobTimeAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentJobTimeAddVm.title} Added Successfully!`
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

jobTimeRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentJobTimeUpdateVm: JobTimeUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistJobTime(currentJobTimeUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentJobTimeUpdateVm.title} Updated Successfully!`
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


jobTimeRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentJobTimeDeleteVm: JobTimeDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistJobTime(currentJobTimeDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `JobTime Deleted Successfully!`
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


