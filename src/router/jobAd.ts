import express from "express";
import {
    addNewJobAd, deleteExistJobAd,
    getAllJobAd,
    getCountOfJobAd,
    getJobAdByFilter,
    getJobAdById,
    getJobAdByIdAndFilter, updateExistJobAd
} from "../utility/coreMethod/jobAd";
import {JobAdAddVm, JobAdDeleteVm, JobAdUpdateVm} from "../utility/type/jobAd";

export const jobAdRouter = express.Router()

jobAdRouter.get(
    `/`,
    async (req, res) =>
    {
        let jobAdList = await getAllJobAd()
        if (jobAdList != null)
        {
            return res.status(200).json(jobAdList)
        }
        else
        {
            return res.status(404).json({
                Message: `No jobAd found!`
            })
        }
    }
)

jobAdRouter.get(
    `/count`,
    async (req, res) =>
    {
        let jobAdCount = await getCountOfJobAd()
        if (jobAdCount != null)
        {
            return res.status(200).json(`Count of jobAd: ${jobAdCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No jobAd found!`
            })
        }
    }
)

jobAdRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentJobAd = await getJobAdById(req.params.id)
        if (currentJobAd != null)
        {
            return res.status(200).json(currentJobAd)
        }
        else
        {
            return res.status(404).json({
                Message: `No jobAd found!`
            })
        }
    }
)

jobAdRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let jobAdList = await getJobAdByFilter(req.params.filter)
        if (jobAdList != null)
        {
            return res.status(200).json(jobAdList)
        }
        else
        {
            return res.status(404).json({
                Message: `No jobAd found!`
            })
        }
    }
)

jobAdRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let jobAdList = await getJobAdByIdAndFilter(req.params.id, req.params.filter)
        if (jobAdList != null)
        {
            return res.status(200).json(jobAdList)
        }
        else
        {
            return res.status(404).json({
                Message: `No jobAd found!`
            })
        }
    }
)

jobAdRouter.post(
    '/',
    async (req, res) =>
    {
        let currentJobAdAddVm: JobAdAddVm = {
            company: req.body.company,
            gender: req.body.gender,
            introduction: req.body.introduction,
            isEnable: req.body.isEnable,
            isWithInsurance: req.body.isWithInsurance,
            jobPlace: req.body.jobPlace,
            jobTime: req.body.jobTime,
            neededUser: req.body.neededUser,
            requiredWorkExperience: req.body.requiredWorkExperience,
            salary: req.body.salary,
            seniorityLevel: req.body.seniorityLevel
        }
        let result: boolean | null = await addNewJobAd(currentJobAdAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current Job Ad Added Successfully!`
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

jobAdRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentJobAdUpdateVm: JobAdUpdateVm = {
            id: req.params.id,
            company: req.body.company,
            gender: req.body.gender,
            introduction: req.body.introduction,
            isEnable: req.body.isEnable,
            isWithInsurance: req.body.isWithInsurance,
            jobPlace: req.body.jobPlace,
            jobTime: req.body.jobTime,
            neededUser: req.body.neededUser,
            requiredWorkExperience: req.body.requiredWorkExperience,
            salary: req.body.salary,
            seniorityLevel: req.body.seniorityLevel,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistJobAd(currentJobAdUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current Job Ad Updated Successfully!`
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


jobAdRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentJobAdDeleteVm: JobAdDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistJobAd(currentJobAdDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `JobAd Deleted Successfully!`
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


