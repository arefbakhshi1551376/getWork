import express from "express";
import {
    addNewIntroduction, deleteExistIntroduction,
    getAllIntroduction,
    getCountOfIntroduction,
    getIntroductionByFilter,
    getIntroductionById, getIntroductionByIdAndFilter, updateExistIntroduction
} from "../utility/coreMethod/introduction";
import {IntroductionAddVm, IntroductionDeleteVm, IntroductionUpdateVm} from "../utility/type/introduction";

export const introductionRouter = express.Router()

introductionRouter.get(
    `/`,
    async (req, res) =>
    {
        let introductionList = await getAllIntroduction()
        if (introductionList != null)
        {
            return res.status(200).json(introductionList)
        }
        else
        {
            return res.status(404).json({
                Message: `No introduction found!`
            })
        }
    }
)

introductionRouter.get(
    `/count`,
    async (req, res) =>
    {
        let introductionCount = await getCountOfIntroduction()
        if (introductionCount != null)
        {
            return res.status(200).json(`Count of introduction: ${introductionCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No introduction found!`
            })
        }
    }
)

introductionRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentIntroduction = await getIntroductionById(req.params.id)
        if (currentIntroduction != null)
        {
            return res.status(200).json(currentIntroduction)
        }
        else
        {
            return res.status(404).json({
                Message: `No introduction found!`
            })
        }
    }
)

introductionRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let introductionList = await getIntroductionByFilter(req.params.filter)
        if (introductionList != null)
        {
            return res.status(200).json(introductionList)
        }
        else
        {
            return res.status(404).json({
                Message: `No introduction found!`
            })
        }
    }
)

introductionRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let introductionList = await getIntroductionByIdAndFilter(req.params.id, req.params.filter)
        if (introductionList != null)
        {
            return res.status(200).json(introductionList)
        }
        else
        {
            return res.status(404).json({
                Message: `No introduction found!`
            })
        }
    }
)

introductionRouter.post(
    '/',
    async (req, res) =>
    {
        let currentIntroductionAddVm: IntroductionAddVm = {
            description: req.body.description,
            title: req.body.title
        }
        let result: boolean | null = await addNewIntroduction(currentIntroductionAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentIntroductionAddVm.title} Added Successfully!`
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

introductionRouter.put(
    '/:id',
    async (req, res) =>
    {
        let currentIntroductionUpdateVm: IntroductionUpdateVm = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistIntroduction(currentIntroductionUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `${currentIntroductionUpdateVm.title} Updated Successfully!`
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


introductionRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentIntroductionDeleteVm: IntroductionDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistIntroduction(currentIntroductionDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Introduction Deleted Successfully!`
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


