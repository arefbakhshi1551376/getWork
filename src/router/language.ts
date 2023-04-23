import express from "express";
import {
    addNewLanguage, deleteExistLanguage,
    getAllLanguage,
    getCountOfLanguage,
    getLanguageByFilter,
    getLanguageById,
    getLanguageByIdAndFilter, updateExistLanguage
} from "../utility/coreMethod/language";
import {LanguageAddVm, LanguageDeleteVm, LanguageUpdateVm} from "../utility/type/language";

export const languageRouter = express.Router()

languageRouter.get(
    `/`,
    async (req, res) =>
    {
        let languageList = await getAllLanguage()
        if (languageList != null)
        {
            return res.status(200).json(languageList)
        }
        else
        {
            return res.status(404).json({
                Message: `No language found!`
            })
        }
    }
)

languageRouter.get(
    `/count`,
    async (req, res) =>
    {
        let languageCount = await getCountOfLanguage()
        if (languageCount != null)
        {
            return res.status(200).json(`Count of language: ${languageCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No language found!`
            })
        }
    }
)

languageRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentLanguage = await getLanguageById(req.params.id)
        if (currentLanguage != null)
        {
            return res.status(200).json(currentLanguage)
        }
        else
        {
            return res.status(404).json({
                Message: `No language found!`
            })
        }
    }
)

languageRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let languageList = await getLanguageByFilter(req.params.filter)
        if (languageList != null)
        {
            return res.status(200).json(languageList)
        }
        else
        {
            return res.status(404).json({
                Message: `No language found!`
            })
        }
    }
)

languageRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let languageList = await getLanguageByIdAndFilter(req.params.id, req.params.filter)
        if (languageList != null)
        {
            return res.status(200).json(languageList)
        }
        else
        {
            return res.status(404).json({
                Message: `No language found!`
            })
        }
    }
)

languageRouter.post(
    '/',
    async (req, res) =>
    {
        let currentLanguageAddVm: LanguageAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewLanguage(currentLanguageAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentLanguageAddVm.title} Added Successfully!`
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

languageRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentLanguageUpdateVm: LanguageUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistLanguage(currentLanguageUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentLanguageUpdateVm.title} Updated Successfully!`
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


languageRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentLanguageDeleteVm: LanguageDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistLanguage(currentLanguageDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Language Deleted Successfully!`
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


