import express from "express";
import {
    addNewStatus, deleteExistStatus,
    getAllStatus,
    getCountOfStatus,
    getStatusByFilter, getStatusById, getStatusByIdAndFilter, getStatusByTitle,
    updateExistStatus
} from "../utility/coreMethod/status";
import {StatusAddVm, StatusDeleteVm, StatusUpdateVm} from "../utility/type/status";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const statusRouter = express.Router()

statusRouter.get(
    `/`,
    async (req, res) =>
    {
        let statusList = await getAllStatus()
        if (statusList != null)
        {
            return res.status(200).json(statusList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

statusRouter.get(
    `/count`,
    async (req, res) =>
    {
        let statusCount = await getCountOfStatus()
        if (statusCount != null)
        {
            return res.status(200).json(`Count of status: ${statusCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

statusRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let statusList = await getStatusByFilter(req.params.filter)
        if (statusList != null)
        {
            return res.status(200).json(statusList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

statusRouter.get(
    `/by_title/:title?`,
    async (req, res) =>
    {
        let statusList = await getStatusByTitle(req.params.title)
        if (statusList != null)
        {
            return res.status(200).json(statusList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

statusRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let statusList = await getStatusByIdAndFilter(req.params.id, req.params.filter)
        if (statusList != null)
        {
            return res.status(200).json(statusList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

statusRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentStatus = await getStatusById(req.params.id)
        if (currentStatus != null)
        {
            return res.status(200).json(currentStatus)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

statusRouter.post(
    '/',
    async (req, res) =>
    {
        let currentStatusAddVm: StatusAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: req.body.title
        }
        let result: boolean | null = await addNewStatus(currentStatusAddVm)
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

statusRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentStatusUpdateVm: StatusUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistStatus(currentStatusUpdateVm)
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

statusRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentStatusDeleteVm: StatusDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistStatus(currentStatusDeleteVm)
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