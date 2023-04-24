import {Company} from "../../mvc/model/company";
import {CompanyAddVm, CompanyDeleteVm, CompanyGalleryUpdateVm, CompanyUpdateVm} from "../type/company";
import {idIsNotValid} from "../validator";
import {Address} from "../../mvc/model/address";
import {getAddressById} from "./address";
import {getIntroductionById} from "./introduction";

export async function getCountOfCompany()
{
    let countOfCompany = await Company.count()
    if (countOfCompany)
    {
        return countOfCompany
    }
    else
    {
        return null
    }
}

export async function getAllCompany()
{
    let companyList = await Company.find() // TODO: Check if it works!
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'address',
            populate: {
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
                }
            }
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (companyList)
    {
        return companyList
    }
    else
    {
        return null
    }
}

export async function getCompanyByFilter(filter: any)
{
    let companyList = await Company.find()
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'address',
            populate: {
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
                }
            }
        })
        .select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (companyList)
    {
        return companyList
    }
    else
    {
        return null
    }
}

export async function getCompanyById(id: string)
{
    let currentCompany = await Company.findById(id)
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'address',
            populate: {
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
                }
            }
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentCompany)
    {
        return currentCompany
    }
    else
    {
        return null
    }
}

export async function getCompanyByIdAndFilter(id: string, filter: any)
{
    let currentCompany: any
    if (filter)
    {
        currentCompany = await Company.findById(id)
            .populate({
                path: 'introduction',
                select: 'title description'
            })
            .populate({
                path: 'address',
                populate: {
                    path: 'city',
                    select: 'title',
                    populate: {
                        path: 'state',
                        select: 'title',
                        populate: {
                            path: 'country',
                            populate: 'title'
                        }
                    }
                }
            })
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentCompany = await getCompanyById(id)
    }

    if (currentCompany)
    {
        return currentCompany
    }
    else
    {
        return null
    }
}

export async function addNewCompany(entity: CompanyAddVm): Promise<null | boolean>
{

    if (idIsNotValid(entity.introduction) || idIsNotValid(entity.address))
    {
        return null
    }
    let currentIntroduction = await getIntroductionById(entity.introduction)
    let currentAddress = await getAddressById(entity.address)
    if (currentIntroduction && currentAddress)
    {
        let currentCompany = new Company({
            introduction: entity.introduction,
            address: entity.address,
            email: entity.email,
            phoneNumber: entity.phoneNumber,
            mainImage: entity.mainImage,
            albumImage: entity.albumImage,
            establishYear: entity.establishYear,
        })
        let result = await currentCompany.save()
        return !!result;
    }
    return false


    // currentAddress.save()
    //     .then(value =>
    //     {
    //         console.log(value)
    //         return true
    //     })
    //     .catch(reason =>
    //     {
    //         console.log(reason)
    //         return false
    //     })
}

export async function updateExistCompany(entity: CompanyUpdateVm)
{
    if (idIsNotValid(entity.id) || idIsNotValid(entity.address) || idIsNotValid(entity.introduction))
    {
        return null
    }
    let currentIntroduction = await getIntroductionById(entity.introduction)
    let currentAddress = await getAddressById(entity.address)
    if (currentAddress && currentIntroduction)
    {
        let currentCompany = await Company.findByIdAndUpdate(
            entity.id,
            {
                introduction: entity.introduction,
                address: entity.address,
                email: entity.email,
                phoneNumber: entity.phoneNumber,
                mainImage: entity.mainImage,
                establishYear: entity.establishYear,
                updateDate: entity.updateDate
            }
        )
        return !!currentCompany;
    }
    return false
}

export async function updateGalleryOfExistCompany(entity: CompanyGalleryUpdateVm)
{
    let currentCompany = await Company.findByIdAndUpdate(
        entity.id,
        {
            albumImages: entity.albumImages,
            updateDate: entity.updateDate
        }
    )
    return !!currentCompany;
}

export async function deleteExistCompany(entity: CompanyDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Company.findByIdAndRemove(entity.id)
    return !!result;
    // .then(value =>
    // {
    //     if (value)
    //     {
    //         console.log(value)
    //         return true
    //     }
    //     else
    //     {
    //         console.log('Error while removing country!')
    //         return false
    //     }
    // })
    // .catch(reason =>
    // {
    //     console.log(reason)
    //     return false
    // })
}

