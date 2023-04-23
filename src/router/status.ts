import express from "express";
import {showMessageForEveryThing} from "../utility/showResponseMessage";
import {modelsName, whatHappened} from "../utility/constant";
import {
    addNewStatus, deleteExistStatus,
    getAllStatus,
    getCountOfStatus,
    getStatusByFilter, getStatusById, getStatusByIdAndFilter,
    updateExistStatus
} from "../utility/coreMethod/status";
import {StatusAddVm, StatusDeleteVm, StatusUpdateVm} from "../utility/type/status";
import {getStateById, getStateByIdAndFilter} from "../utility/coreMethod/state";
import {stateRouter} from "./state";

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
            return showMessageForEveryThing(res, 404, modelsName.Status, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.Status, whatHappened.Found)
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
            return res.status(404).json({
                Message: `No state found!`
            })
        }
    }
)

statusRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let statusList = await getStatusByFilter(req.params.filter)
        if (statusList != null)
        {
            return res.status(200).json(statusList)
        }
        else
        {
            return showMessageForEveryThing(res, 404, modelsName.Status, whatHappened.Found)
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
            return res.status(404).json({
                Message: `No state found!`
            })
        }
    }
)

statusRouter.post(
    '/',
    async (req, res) =>
    {
        let currentStatusAddVm: StatusAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewStatus(currentStatusAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentStatusAddVm.title} Added Successfully!`
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

statusRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentStatusUpdateVm: StatusUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistStatus(currentStatusUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentStatusUpdateVm.title} Updated Successfully!`
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
            return res.status(200).json({
                Message: `Status Deleted Successfully!`
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