import express from "express";
import {
    addNewResume, deleteExistResume,
    getAllResume,
    getCountOfResume,
    getResumeByFilter,
    getResumeById,
    getResumeByIdAndFilter, updateExistResume
} from "../utility/coreMethod/resume";
import {ResumeAddVm, ResumeDeleteVm, ResumeUpdateVm} from "../utility/type/resume";

export const resumeRouter = express.Router()

resumeRouter.get(
    `/`,
    async (req, res) =>
    {
        let resumeList = await getAllResume()
        if (resumeList != null)
        {
            return res.status(200).json(resumeList)
        }
        else
        {
            return res.status(404).json({
                Message: `No resume found!`
            })
        }
    }
)

resumeRouter.get(
    `/count`,
    async (req, res) =>
    {
        let resumeCount = await getCountOfResume()
        if (resumeCount != null)
        {
            return res.status(200).json(`Count of resume: ${resumeCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No resume found!`
            })
        }
    }
)

resumeRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentResume = await getResumeById(req.params.id)
        if (currentResume != null)
        {
            return res.status(200).json(currentResume)
        }
        else
        {
            return res.status(404).json({
                Message: `No resume found!`
            })
        }
    }
)

resumeRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let resumeList = await getResumeByFilter(req.params.filter)
        if (resumeList != null)
        {
            return res.status(200).json(resumeList)
        }
        else
        {
            return res.status(404).json({
                Message: `No resume found!`
            })
        }
    }
)

resumeRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let resumeList = await getResumeByIdAndFilter(req.params.id, req.params.filter)
        if (resumeList != null)
        {
            return res.status(200).json(resumeList)
        }
        else
        {
            return res.status(404).json({
                Message: `No resume found!`
            })
        }
    }
)

resumeRouter.post(
    '/',
    async (req, res) =>
    {
        let currentResumeAddVm: ResumeAddVm = {
            careerHistory: req.body.careerHistory,
            degree: req.body.degree,
            expectedSalary: req.body.expectedSalary,
            favoriteJob: req.body.favoriteJob,
            isShowToOthers: req.body.isShowToOthers,
            jobPlace: req.body.jobPlace,
            jobTime: req.body.jobTime,
            languageLevel: req.body.languageLevel,
            link: req.body.link,
            skillLevel: req.body.skillLevel,
            user: req.body.user // TODO: User must be filled with login user id
        }
        let result: boolean | null = await addNewResume(currentResumeAddVm)
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

resumeRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentResumeUpdateVm: ResumeUpdateVm = {
            id: req.params.id,
            careerHistory: req.body.careerHistory,
            degree: req.body.degree,
            expectedSalary: req.body.expectedSalary,
            favoriteJob: req.body.favoriteJob,
            isShowToOthers: req.body.isShowToOthers,
            jobPlace: req.body.jobPlace,
            jobTime: req.body.jobTime,
            languageLevel: req.body.languageLevel,
            link: req.body.link,
            skillLevel: req.body.skillLevel,
            user: req.body.user, // TODO: User must be filled with login user id,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistResume(currentResumeUpdateVm)
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


resumeRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentResumeDeleteVm: ResumeDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistResume(currentResumeDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Resume Deleted Successfully!`
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


