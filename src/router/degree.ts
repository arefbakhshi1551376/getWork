import express from "express";
import {
    addNewDegree, deleteExistDegree,
    getAllDegree,
    getCountOfDegree,
    getDegreeByFilter,
    getDegreeById,
    getDegreeByIdAndFilter, updateExistDegree
} from "../utility/coreMethod/degree";
import {DegreeAddVm, DegreeDeleteVm, DegreeUpdateVm} from "../utility/type/degree";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const degreeRouter = express.Router()

degreeRouter.get(
    `/`,
    async (req, res) =>
    {
        let degreeList = await getAllDegree()
        if (degreeList != null)
        {
            return res.status(200).json(degreeList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

degreeRouter.get(
    `/count`,
    async (req, res) =>
    {
        let degreeCount = await getCountOfDegree()
        if (degreeCount != null)
        {
            return res.status(200).json(`Count of degree: ${degreeCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

degreeRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let degreeList = await getDegreeByFilter(req.params.filter)
        if (degreeList != null)
        {
            return res.status(200).json(degreeList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

degreeRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let degreeList = await getDegreeByIdAndFilter(req.params.id, req.params.filter)
        if (degreeList != null)
        {
            return res.status(200).json(degreeList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

degreeRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentDegree = await getDegreeById(req.params.id)
        if (currentDegree != null)
        {
            return res.status(200).json(currentDegree)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

degreeRouter.post(
    '/',
    async (req, res) =>
    {
        let currentDegreeAddVm: DegreeAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            dateOfIssue: req.body.dateOfIssue,
            instituteName: req.body.instituteName,
            trainingCourse: req.body.trainingCourse
        }
        let result: boolean | null = await addNewDegree(currentDegreeAddVm)
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

degreeRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentDegreeUpdateVm: DegreeUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            dateOfIssue: req.body.dateOfIssue,
            instituteName: req.body.instituteName,
            trainingCourse: req.body.trainingCourse,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistDegree(currentDegreeUpdateVm)
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


degreeRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentDegreeDeleteVm: DegreeDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistDegree(currentDegreeDeleteVm)
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


