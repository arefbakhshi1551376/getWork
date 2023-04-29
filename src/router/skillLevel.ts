import express from "express";
import {
    addNewSkillLevel, deleteExistSkillLevel,
    getAllSkillLevel,
    getCountOfSkillLevel,
    getSkillLevelByFilter,
    getSkillLevelById, getSkillLevelByIdAndFilter, updateExistSkillLevel
} from "../utility/coreMethod/skillLevel";
import {SkillLevelAddVm, SkillLevelDeleteVm, SkillLevelUpdateVm} from "../utility/type/skillLevel";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const skillLevelRouter = express.Router()

skillLevelRouter.get(
    `/`,
    async (req, res) =>
    {
        let skillLevelList = await getAllSkillLevel()
        if (skillLevelList != null)
        {
            return res.status(200).json(skillLevelList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillLevelRouter.get(
    `/count`,
    async (req, res) =>
    {
        let languageLeveCount = await getCountOfSkillLevel()
        if (languageLeveCount != null)
        {
            return res.status(200).json(`Count of skill level: ${languageLeveCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillLevelRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let skillLevelList = await getSkillLevelByFilter(req.params.filter)
        if (skillLevelList != null)
        {
            return res.status(200).json(skillLevelList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillLevelRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let skillLevelList = await getSkillLevelByIdAndFilter(req.params.id, req.params.filter)
        if (skillLevelList != null)
        {
            return res.status(200).json(skillLevelList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillLevelRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentSkillLevel = await getSkillLevelById(req.params.id)
        if (currentSkillLevel != null)
        {
            return res.status(200).json(currentSkillLevel)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillLevelRouter.post(
    '/',
    async (req, res) =>
    {
        let currentSkillLevelAddVm: SkillLevelAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            skill: req.body.skill,
            level: req.body.level
        }
        let result: boolean | null = await addNewSkillLevel(currentSkillLevelAddVm)
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

skillLevelRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentSkillLevelUpdateVm: SkillLevelUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            skill: req.body.skill,
            level: req.body.level,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistSkillLevel(currentSkillLevelUpdateVm)
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


skillLevelRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentSkillLevelDeleteVm: SkillLevelDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistSkillLevel(currentSkillLevelDeleteVm)
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


