import express from "express";
import {showMessageForEveryThing} from "../utility/showResponseMessage";
import {modelsName, whatHappened} from "../utility/constant";
import {
    addNewCareerHistory,
    deleteExistCareerHistory,
    getAllCareerHistory, getCareerHistoryByFilter,
    getCareerHistoryById,
    getCareerHistoryByIdAndFilter,
    getCountOfCareerHistory, updateExistCareerHistory
} from "../utility/coreMethod/careerHistory";
import {CareerHistoryAddVm, CareerHistoryDeleteVm, CareerHistoryUpdateVm} from "../utility/type/careerHistory";

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
            return showMessageForEveryThing(res, 404, modelsName.CareerHistory, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.CareerHistory, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.CareerHistory, whatHappened.Found)
        }
    }
)

careerHistoryRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let careerHistoryList = await getCareerHistoryByFilter(req.params.filter)
        if (careerHistoryList != null)
        {
            return res.status(200).json(careerHistoryList)
        }
        else
        {
            return showMessageForEveryThing(res, 404, modelsName.CareerHistory, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.CareerHistory, whatHappened.Found)
        }
    }
)

careerHistoryRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCareerHistoryAddVm: CareerHistoryAddVm = {
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
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

careerHistoryRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCareerHistoryUpdateVm: CareerHistoryUpdateVm = {
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
            return res.status(400).json({
                Message: 'An error occurred!'
            })
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
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)