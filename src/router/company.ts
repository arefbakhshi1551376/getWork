import express from "express";
import {
    addNewCompany, deleteExistCompany,
    getAllCompany,
    getCompanyByFilter,
    getCompanyById,
    getCompanyByIdAndFilter,
    getCountOfCompany, updateExistCompany, updateGalleryOfExistCompany
} from "../utility/coreMethod/company";
import {CompanyAddVm, CompanyDeleteVm, CompanyGalleryUpdateVm, CompanyUpdateVm} from "../utility/type/company";
import {uploadOptions} from "../utility/diskStorage";
import {getUploadPath} from "../utility/constant";

export const companyRouter = express.Router()

companyRouter.get(
    `/`,
    async (req, res) =>
    {
        let companyList = await getAllCompany()
        if (companyList != null)
        {
            return res.status(200).json(companyList)
        }
        else
        {
            return res.status(404).json({
                Message: `No company found!`
            })
        }
    }
)

companyRouter.get(
    `/count`,
    async (req, res) =>
    {
        let companyCount = await getCountOfCompany()
        if (companyCount != null)
        {
            return res.status(200).json(`Count of company: ${companyCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No company found!`
            })
        }
    }
)

companyRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentCompany = await getCompanyById(req.params.id)
        if (currentCompany != null)
        {
            return res.status(200).json(currentCompany)
        }
        else
        {
            return res.status(404).json({
                Message: `No company found!`
            })
        }
    }
)

companyRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let companyList = await getCompanyByFilter(req.params.filter)
        if (companyList != null)
        {
            return res.status(200).json(companyList)
        }
        else
        {
            return res.status(404).json({
                Message: `No company found!`
            })
        }
    }
)

companyRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let companyList = await getCompanyByIdAndFilter(req.params.id, req.params.filter)
        if (companyList != null)
        {
            return res.status(200).json(companyList)
        }
        else
        {
            return res.status(404).json({
                Message: `No company found!`
            })
        }
    }
)

companyRouter.post(
    '/',
    uploadOptions.single('mainImage'),
    async (req, res) =>
    {
        if (!req.file)
        {
            res.json({
                Message: 'File does not exist!'
            })
        }
        let currentCompanyAddVm: CompanyAddVm = {
            address: req.body.address,
            albumImage: [],
            email: req.body.email,
            establishYear: req.body.establishYear,
            introduction: req.body.introduction,
            mainImage: `${getUploadPath(req)}${req.file?.filename}`,
            phoneNumber: req.body.phoneNumber
        }

        // return res.status(200).json({
        //     Message: currentCompanyAddVm
        // })
        let result: boolean | null = await addNewCompany(currentCompanyAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current company Added Successfully!`
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

companyRouter.put(
    '/:id',
    uploadOptions.single('mainImage'),
    async (req, res) =>
    {
        if (!req.file)
        {
            res.json({
                Message: 'File does not exist!'
            })
        }
        let currentCompanyUpdateVm: CompanyUpdateVm = {
            id: req.params.id,
            address: req.body.address,
            albumImage: [],
            email: req.body.email,
            establishYear: req.body.establishYear,
            introduction: req.body.introduction,
            mainImage: `${getUploadPath(req)}${req.file?.filename}`,
            phoneNumber: req.body.phoneNumber,
            updateDate: new Date()
        }
        let result: null | boolean = await updateExistCompany(currentCompanyUpdateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Company Updated Successfully!`
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

companyRouter.put(
    '/upload_gallery/:id',
    uploadOptions.array('albumImages'),
    async (req, res) =>
    {
        if (!req.files)
        {
            res.json({
                Message: 'Files does not exist!'
            })
        }
        else
        {
            const files = req.files as Array<any>
            let imagesPaths: string[] = [];
            files.map(file =>
            {
                imagesPaths.push(`${getUploadPath(req)}${file.filename}`)
            })
            let currentCompanyGalleryUpdateVm: CompanyGalleryUpdateVm = {
                id: req.params.id,
                albumImages: imagesPaths,
                updateDate: new Date()
            }
            let result: boolean = await updateGalleryOfExistCompany(currentCompanyGalleryUpdateVm)
            if (result)
            {
                return res.status(200).json({
                    Message: `Company Updated Successfully!`
                })
            }
            else
            {
                return res.status(400).json({
                    Message: 'An error occurred!'
                })
            }
        }
    }
)


companyRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentCompanyDeleteVm: CompanyDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistCompany(currentCompanyDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Company Deleted Successfully!`
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


