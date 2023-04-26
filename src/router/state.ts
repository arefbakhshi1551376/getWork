import express from "express";
import {
    addNewState, deleteExistState,
    getAllState,
    getCountOfState,
    getStateByFilter,
    getStateById,
    getStateByIdAndFilter, updateExistState
} from "../utility/coreMethod/state";
import {StateAddVm, StateDeleteVm, StateUpdateVm} from "../utility/type/state";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";

export const stateRouter = express.Router()

stateRouter.get(
    `/`,
    async (req, res) =>
    {
        let stateList = await getAllState()
        if (stateList != null)
        {
            return res.status(200).json(stateList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

stateRouter.get(
    `/count`,
    async (req, res) =>
    {
        let stateCount = await getCountOfState()
        if (stateCount != null)
        {
            return res.status(200).json(`Count of state: ${stateCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

stateRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let stateList = await getStateByFilter(req.params.filter)
        if (stateList != null)
        {
            return res.status(200).json(stateList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

stateRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let stateList = await getStateByIdAndFilter(req.params.id, req.params.filter)
        if (stateList != null)
        {
            return res.status(200).json(stateList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

stateRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentState = await getStateById(req.params.id)
        if (currentState != null)
        {
            return res.status(200).json(currentState)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

stateRouter.post(
    '/',
    async (req, res) =>
    {
        let currentStateAddVm: StateAddVm = {
            country: req.body.country,
            title: req.body.title
        }
        let result: boolean | null = await addNewState(currentStateAddVm)
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

stateRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentStateUpdateVm: StateUpdateVm = {
            id: req.params.id,
            country: req.body.country,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistState(currentStateUpdateVm)
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


stateRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentStateDeleteVm: StateDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistState(currentStateDeleteVm)
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


