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
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

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
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
        }
    }
)

resumeRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let resumeList = await getResumeByFilter(req.params.filter)
        if (resumeList != null)
        {
            return res.status(200).json(resumeList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
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
            user: currentAuthType.LOGIN_USER_ID
        }
        let result: boolean | null = await addNewResume(currentResumeAddVm)
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
            user: currentAuthType.LOGIN_USER_ID,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistResume(currentResumeUpdateVm)
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
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)


