import express from "express";
import {
    addNewRequest, deleteExistRequest,
    getAllRequest,
    getCountOfRequest,
    getRequestByFilter,
    getRequestById,
    getRequestByIdAndFilter, updateExistRequest
} from "../utility/coreMethod/userRequest";
import {RequestAddVm, RequestDeleteVm, RequestUpdateVm} from "../utility/type/request";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const userRequestRouter = express.Router()

userRequestRouter.get(
    `/`,
    async (req, res) =>
    {
        let requestList = await getAllRequest()
        if (requestList != null)
        {
            return res.status(200).json(requestList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRequestRouter.get(
    `/count`,
    async (req, res) =>
    {
        let requestCount = await getCountOfRequest()
        if (requestCount != null)
        {
            return res.status(200).json(`Count of request: ${requestCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRequestRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let requestList = await getRequestByFilter(req.params.filter)
        if (requestList != null)
        {
            return res.status(200).json(requestList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRequestRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let requestList = await getRequestByIdAndFilter(req.params.id, req.params.filter)
        if (requestList != null)
        {
            return res.status(200).json(requestList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRequestRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentRequest = await getRequestById(req.params.id)
        if (currentRequest != null)
        {
            return res.status(200).json(currentRequest)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRequestRouter.post(
    '/',
    async (req, res) =>
    {
        let currentRequestAddVm: RequestAddVm = {
            jobAd: req.body.jobAd,
            user: currentAuthType.LOGIN_USER_ID
        }
        let result: boolean | null = await addNewRequest(currentRequestAddVm)
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

userRequestRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentRequestUpdateVm: RequestUpdateVm = {
            status: req.body.status, // TODO: when admin see a request, status must be changed. You have to write new method just for update status of request
            id: req.params.id,
            jobAd: req.body.jobAd,
            user: currentAuthType.LOGIN_USER_ID,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistRequest(currentRequestUpdateVm)
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


userRequestRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentRequestDeleteVm: RequestDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistRequest(currentRequestDeleteVm)
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


