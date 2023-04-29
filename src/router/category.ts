import express from "express";
import {
    addNewCategory, deleteExistCategory,
    getAllCategory,
    getCategoryByFilter,
    getCategoryById,
    getCategoryByIdAndFilter,
    getCountOfCategory, updateExistCategory
} from "../utility/coreMethod/category";
import {CategoryAddVm, CategoryDeleteVm, CategoryUpdateVm} from "../utility/type/category";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const categoryRouter = express.Router()

categoryRouter.get(
    `/`,
    async (req, res) =>
    {
        let categoryList = await getAllCategory()
        if (categoryList != null)
        {
            return res.status(200).json(categoryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

categoryRouter.get(
    `/count`,
    async (req, res) =>
    {
        let categoryCount = await getCountOfCategory()
        if (categoryCount != null)
        {
            return res.status(200).json(`Count of category: ${categoryCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

categoryRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let categoryList = await getCategoryByFilter(req.params.filter)
        if (categoryList != null)
        {
            return res.status(200).json(categoryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

categoryRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let categoryList = await getCategoryByIdAndFilter(req.params.id, req.params.filter)
        if (categoryList != null)
        {
            return res.status(200).json(categoryList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

categoryRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentCategory = await getCategoryById(req.params.id)
        if (currentCategory != null)
        {
            return res.status(200).json(currentCategory)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

categoryRouter.post(
    '/',
    async (req, res) =>
    {
        let currentCategoryAddVm: CategoryAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: req.body.title
        }
        let result: boolean | null = await addNewCategory(currentCategoryAddVm)
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

categoryRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentCategoryUpdateVm: CategoryUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistCategory(currentCategoryUpdateVm)
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


categoryRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentCategoryDeleteVm: CategoryDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistCategory(currentCategoryDeleteVm)
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


