import express from "express";
import {
    addNewSkillLevel, deleteExistSkillLevel,
    getAllSkillLevel,
    getCountOfSkillLevel,
    getSkillLevelByFilter,
    getSkillLevelById, getSkillLevelByIdAndFilter, updateExistSkillLevel
} from "../utility/coreMethod/skillLevel";
import {SkillLevelAddVm, SkillLevelDeleteVm, SkillLevelUpdateVm} from "../utility/type/skillLevel";

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
            return res.status(404).json({
                Message: `No languageLeve found!`
            })
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
            return res.status(404).json({
                Message: `No skill level found!`
            })
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
            return res.status(404).json({
                Message: `No skill level found!`
            })
        }
    }
)

skillLevelRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let skillLevelList = await getSkillLevelByFilter(req.params.filter)
        if (skillLevelList != null)
        {
            return res.status(200).json(skillLevelList)
        }
        else
        {
            return res.status(404).json({
                Message: `No skill level found!`
            })
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
            return res.status(404).json({
                Message: `No skill level found!`
            })
        }
    }
)

skillLevelRouter.post(
    '/',
    async (req, res) =>
    {
        let currentSkillLevelAddVm: SkillLevelAddVm = {
            skill: req.body.skill,
            level: req.body.level
        }
        let result: boolean | null = await addNewSkillLevel(currentSkillLevelAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current Skill Level Added Successfully!`
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

skillLevelRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentSkillLevelUpdateVm: SkillLevelUpdateVm = {
            id: req.params.id,
            skill: req.body.skill,
            level: req.body.level,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistSkillLevel(currentSkillLevelUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current Skill Level Updated Successfully!`
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
            return res.status(200).json({
                Message: `Skill Level Deleted Successfully!`
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


