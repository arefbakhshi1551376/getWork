import express from "express";
import {
    addNewSkill, deleteExistSkill,
    getAllSkill,
    getCountOfSkill,
    getSkillByFilter, getSkillById,
    getSkillByIdAndFilter, updateExistSkill
} from "../utility/coreMethod/skill";
import {SkillAddVm, SkillDeleteVm, SkillUpdateVm} from "../utility/type/skill";
import {getErrorMessageList, getSuccessMessageList} from "../utility/handler/messageHandler/messageMethod";
import {currentAuthType} from "../utility/constant";

export const skillRouter = express.Router()

skillRouter.get(
    `/count`,
    async (req, res) =>
    {
        let skillCount = await getCountOfSkill()
        if (skillCount != null)
        {
            return res.status(200).json(`Count of skill: ${skillCount}`)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillRouter.get(
    `/`,
    async (req, res) =>
    {
        let skillList = await getAllSkill()
        if (skillList != null)
        {
            return res.status(200).json(skillList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let skillList = await getSkillByFilter(req.params.filter)
        if (skillList != null)
        {
            return res.status(200).json(skillList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let skillList = await getSkillByIdAndFilter(req.params.id, req.params.filter)
        if (skillList != null)
        {
            return res.status(200).json(skillList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let skillList = await getSkillById(req.params.id)
        if (skillList != null)
        {
            return res.status(200).json(skillList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

skillRouter.post(
    '/',
    async (req, res) =>
    {
        let currentSkillAddVm: SkillAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: req.body.title
        }
        let result: boolean | null = await addNewSkill(currentSkillAddVm)
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

skillRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentSkillUpdateVm: SkillUpdateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistSkill(currentSkillUpdateVm)
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

skillRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentSkillDeleteVm: SkillDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistSkill(currentSkillDeleteVm)
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