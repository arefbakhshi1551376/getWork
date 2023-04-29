import {Company} from "../../mvc/model/company";
import {CompanyAddVm, CompanyDeleteVm, CompanyGalleryUpdateVm, CompanyUpdateVm} from "../type/company";
import {idIsNotValid} from "../validator";
import {getAddressById} from "./address";
import {getIntroductionById} from "./introduction";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfCompany()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfCompany = await Company.count()
    if (countOfCompany)
    {
        return countOfCompany
    }
    else
    {
        addNewErrorMessage(`We can not get count of company!`)
        return null
    }
}

export async function getAllCompany()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        addNewErrorMessage(`We can not get list of company!`)
        return null
    }
}

export async function getCompanyById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current company!`)
        return null
    }
}

export async function getCompanyByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let companyList: any
    if (filter)
    {
        companyList = await Company.find()
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
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter a filter!`)
        return null
    }

    if (companyList)
    {
        return companyList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of company!`)
        return null
    }
}

export async function getCompanyByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`The id ${id} is invalid!`)
        return null
    }

    let currentCompany: any
    if (filter)
    {
        console.log(`I am in filter`)
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
        addNewErrorMessage(`We can not get current company!`)
        return null
    }
}

export async function addNewCompany(entity: CompanyAddVm): Promise<null | boolean>
{
    emptyMessageList()

    if (idIsNotValid(entity.introduction))
    {
        addNewErrorMessage(`The id ${entity.introduction} is invalid!`)
        return null
    }

    let currentIntroduction = await getIntroductionById(entity.introduction)
    if (!currentIntroduction)
    {
        addNewErrorMessage('No introduction with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.address))
    {
        addNewErrorMessage(`The id ${entity.address} is invalid!`)
        return null
    }

    let currentAddress = await getAddressById(entity.address)
    if (!currentAddress)
    {
        addNewErrorMessage('No address with the same id exists!')
        return null
    }

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
    if (result)
    {
        addNewSuccessMessage('Company added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the company can not be saved!')
        return false
    }
}

export async function updateExistCompany(entity: CompanyUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCompanyById(entity.id)

    if (idIsNotValid(entity.introduction))
    {
        addNewErrorMessage(`The id ${entity.introduction} is invalid!`)
        return null
    }

    let currentIntroduction = await getIntroductionById(entity.introduction)
    if (!currentIntroduction)
    {
        addNewErrorMessage('No introduction with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.address))
    {
        addNewErrorMessage(`The id ${entity.address} is invalid!`)
        return null
    }

    let currentAddress = await getAddressById(entity.address)
    if (!currentAddress)
    {
        addNewErrorMessage('No address with the same id exists!')
        return null
    }

    let result = await Company.findByIdAndUpdate(
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
    if (result)
    {
        addNewSuccessMessage(`The company updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The company can not be updated!`)
        return false
    }
}

export async function updateGalleryOfExistCompany(entity: CompanyGalleryUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCompanyById(entity.id)

    let result = await Company.findByIdAndUpdate(
        entity.id,
        {
            albumImages: entity.albumImages,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The company album gallery updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The company album gallery can not be updated!`)
        return false
    }
}

export async function deleteExistCompany(entity: CompanyDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCompanyById(entity.id)

    let result = await Company.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The company deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The company can not be deleted!`)
        return false
    }
}

