import express from "express";
import {
    addNewJobPlace, deleteExistJobPlace,
    getAllJobPlace,
    getCountOfJobPlace,
    getJobPlaceByFilter,
    getJobPlaceById,
    getJobPlaceByIdAndFilter, updateExistJobPlace
} from "../utility/coreMethod/jobPlace";
import {JobPlaceAddVm, JobPlaceDeleteVm, JobPlaceUpdateVm} from "../utility/type/jobPlace";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const jobPlaceRouter = express.Router()

jobPlaceRouter.get(
    `/`,
    async (req, res) =>
    {
        let jobPlaceList = await getAllJobPlace()
        if (jobPlaceList != null)
        {
            return res.status(200).json(jobPlaceList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

jobPlaceRouter.get(
    `/count`,
    async (req, res) =>
    {
        let jobPlaceCount = await getCountOfJobPlace()
        if (jobPlaceCount != null)
        {
            return res.status(200).json(`Count of job place: ${jobPlaceCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

jobPlaceRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let jobPlaceList = await getJobPlaceByFilter(req.params.filter)
        if (jobPlaceList != null)
        {
            return res.status(200).json(jobPlaceList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

jobPlaceRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let jobPlaceList = await getJobPlaceByIdAndFilter(req.params.id, req.params.filter)
        if (jobPlaceList != null)
        {
            return res.status(200).json(jobPlaceList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

jobPlaceRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentJobPlace = await getJobPlaceById(req.params.id)
        if (currentJobPlace != null)
        {
            return res.status(200).json(currentJobPlace)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

jobPlaceRouter.post(
    '/',
    async (req, res) =>
    {
        let currentJobPlaceAddVm: JobPlaceAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: req.body.title
        }
        let result: boolean | null = await addNewJobPlace(currentJobPlaceAddVm)
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

jobPlaceRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentJobPlaceUpdateVm: JobPlaceUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistJobPlace(currentJobPlaceUpdateVm)
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


jobPlaceRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentJobPlaceDeleteVm: JobPlaceDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistJobPlace(currentJobPlaceDeleteVm)
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


