import express from "express";
import {
    addNewLanguageLevel, deleteExistLanguageLevel,
    getAllLanguageLevel,
    getCountOfLanguageLevel,
    getLanguageLevelByFilter,
    getLanguageLevelById, getLanguageLevelByIdAndFilter, updateExistLanguageLevel
} from "../utility/coreMethod/languageLevel";
import {LanguageLevelAddVm, LanguageLevelDeleteVm, LanguageLevelUpdateVm} from "../utility/type/languageLevel";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const languageLevelRouter = express.Router()

languageLevelRouter.get(
    `/`,
    async (req, res) =>
    {
        let languageLeveList = await getAllLanguageLevel()
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

languageLevelRouter.get(
    `/count`,
    async (req, res) =>
    {
        let languageLevelCount = await getCountOfLanguageLevel()
        if (languageLevelCount != null)
        {
            return res.status(200).json(`Count of language level: ${languageLevelCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

languageLevelRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let languageLevelList = await getLanguageLevelByFilter(req.params.filter)
        if (languageLevelList != null)
        {
            return res.status(200).json(languageLevelList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

languageLevelRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let languageLevelList = await getLanguageLevelByIdAndFilter(req.params.id, req.params.filter)
        if (languageLevelList != null)
        {
            return res.status(200).json(languageLevelList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

languageLevelRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentLanguageLevel = await getLanguageLevelById(req.params.id)
        if (currentLanguageLevel != null)
        {
            return res.status(200).json(currentLanguageLevel)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

languageLevelRouter.post(
    '/',
    async (req, res) =>
    {
        let currentLanguageLevelAddVm: LanguageLevelAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            language: req.body.language,
            level: req.body.level
        }
        let result: boolean | null = await addNewLanguageLevel(currentLanguageLevelAddVm)
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

languageLevelRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentLanguageLevelUpdateVm: LanguageLevelUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            language: req.body.language,
            level: req.body.level,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistLanguageLevel(currentLanguageLevelUpdateVm)
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


languageLevelRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentLanguageLevelDeleteVm: LanguageLevelDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistLanguageLevel(currentLanguageLevelDeleteVm)
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


