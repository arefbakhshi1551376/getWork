import express from "express";
import {
    addNewCareerHistory,
    deleteExistCareerHistory,
    getAllCareerHistory, getCareerHistoryByFilter,
    getCareerHistoryById,
    getCareerHistoryByIdAndFilter,
    getCountOfCareerHistory, updateExistCareerHistory
} from "../utility/coreMethod/careerHistory";
import {CareerHistoryAddVm, CareerHistoryDeleteVm, CareerHistoryUpdateVm} from "../utility/type/careerHistory";
import {getErrorMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const careerHistoryRouter = express.Router()

careerHistoryRouter.get(
    `/`,
    async (req, res) =>
    {
        let careerHistoryList = await getAllCareerHistory()
        if (careerHistoryList != null)
        {
            return res.status(200).json(careerHistoryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

careerHistoryRouter.get(
    `/count`,
    async (req, res) =>
    {
        let careerHistoryCount = await getCountOfCareerHistory()
        if (careerHistoryCount != null)
        {
            return res.status(200).json(`Count of career history: ${careerHistoryCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

careerHistoryRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let careerHistoryList = await getCareerHistoryByFilter(req.params.filter)
        if (careerHistoryList != null)
        {
            return res.status(200).json(careerHistoryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

careerHistoryRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let careerHistoryList = await getCareerHistoryByIdAndFilter(req.params.id, req.params.filter)
        if (careerHistoryList != null)
        {
            return res.status(200).json(careerHistoryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

careerHistoryRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentCareerHistory = await getCareerHistoryById(req.params.id)
        if (currentCareerHistory != null)
        {
            return res.status(200).json(currentCareerHistory)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

careerHistoryRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCareerHistoryAddVm: CareerHistoryAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            endWorkingYear: req.body.endWorkingYear,
            isWorkingYet: req.body.isWorkingYet,
            startWorkingYear: req.body.startWorkingYear,
            workPlace: req.body.workPlace
        }
        let result: boolean | null = await addNewCareerHistory(currentCareerHistoryAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current Career History Added Successfully!`
            })
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)

careerHistoryRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCareerHistoryUpdateVm: CareerHistoryUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            endWorkingYear: req.body.endWorkingYear,
            id: req.params.id,
            isWorkingYet: req.body.isWorkingYet,
            startWorkingYear: req.body.startWorkingYear,
            updateDate: new Date(),
            workPlace: req.body.workPlace
        }
        console.log('Calling from update career history')
        console.log(currentCareerHistoryUpdateVm)
        let result: null | boolean = await updateExistCareerHistory(currentCareerHistoryUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current Career History Updated Successfully!`
            })
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)


careerHistoryRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentCareerHistoryDeleteVm: CareerHistoryDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistCareerHistory(currentCareerHistoryDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Career History Deleted Successfully!`
            })
        }
        else
        {
            return res.status(400).json(getErrorMessageList())
        }
    }
)