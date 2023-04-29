import express from "express";
import {
    addNewSalary, deleteExistSalary,
    getAllSalary,
    getCountOfSalary,
    getSalaryByFilter,
    getSalaryById,
    getSalaryByIdAndFilter, updateExistSalary
} from "../utility/coreMethod/salary";
import {SalaryAddVm, SalaryDeleteVm, SalaryUpdateVm} from "../utility/type/salary";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const salaryRouter = express.Router()

salaryRouter.get(
    `/`,
    async (req, res) =>
    {
        let languageLeveList = await getAllSalary()
        if (languageLeveList != null)
        {
            return res.status(200).json(languageLeveList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

salaryRouter.get(
    `/count`,
    async (req, res) =>
    {
        let salaryCount = await getCountOfSalary()
        if (salaryCount != null)
        {
            return res.status(200).json(`Count of salary: ${salaryCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

salaryRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let salaryList = await getSalaryByFilter(req.params.filter)
        if (salaryList != null)
        {
            return res.status(200).json(salaryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

salaryRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let salaryList = await getSalaryByIdAndFilter(req.params.id, req.params.filter)
        if (salaryList != null)
        {
            return res.status(200).json(salaryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

salaryRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentSalary = await getSalaryById(req.params.id)
        if (currentSalary != null)
        {
            return res.status(200).json(currentSalary)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

salaryRouter.post(
    '/',
    async (req, res) =>
    {
        let currentSalaryAddVm: SalaryAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            isAgreed: req.body.isAgreed,
            amount: req.body.amount
        }
        let result: boolean | null = await addNewSalary(currentSalaryAddVm)
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

salaryRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentSalaryUpdateVm: SalaryUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            isAgreed: req.body.isAgreed,
            amount: req.body.amount,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistSalary(currentSalaryUpdateVm)
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


salaryRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentSalaryDeleteVm: SalaryDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistSalary(currentSalaryDeleteVm)
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


