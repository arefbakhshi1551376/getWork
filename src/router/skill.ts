import express from "express";
import {showMessageForEveryThing} from "../utility/showResponseMessage";
import {modelsName, whatHappened} from "../utility/constant";
import {
    addNewSkill, deleteExistSkill,
    getAllSkill,
    getCountOfSkill,
    getSkillByFilter, getSkillById,
    getSkillByIdAndFilter, updateExistSkill
} from "../utility/coreMethod/skill";
import {SkillAddVm, SkillDeleteVm, SkillUpdateVm} from "../utility/type/skill";

export const skillRouter = express.Router()

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
            return showMessageForEveryThing(res, 404, modelsName.Skill, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.Skill, whatHappened.Found)
        }
    }
)

skillRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let skillList = await getSkillByFilter(req.params.filter)
        if (skillList != null)
        {
            return res.status(200).json(skillList)
        }
        else
        {
            return showMessageForEveryThing(res, 404, modelsName.Skill, whatHappened.Found)
        }
    }
)

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
            return showMessageForEveryThing(res, 404, modelsName.Skill, whatHappened.Found)
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
            return showMessageForEveryThing(res, 404, modelsName.Skill, whatHappened.Found)
        }
    }
)

skillRouter.post(
    '/',
    async (req, res) =>
    {
        let currentSkillAddVm: SkillAddVm = {
            title: req.body.title
        }
        let result: boolean | null = await addNewSkill(currentSkillAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentSkillAddVm.title} Added Successfully!`
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

skillRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentSkillUpdateVm: SkillUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistSkill(currentSkillUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentSkillUpdateVm.title} Updated Successfully!`
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
            return res.status(200).json({
                Message: `Status Deleted Successfully!`
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