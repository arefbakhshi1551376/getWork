import {Gender} from "../../mvc/model/gender";
import {GenderAddVm, GenderDeleteVm, GenderUpdateVm} from "../type/gender";
import {idIsNotValid} from "../validator";
import {Country} from "../../mvc/model/country";
import {defaultGenderMaker} from "../maker";

export async function getCountOfGender()
{
    await defaultGenderMaker()
    let countOfGender = await Gender.count()
    if (countOfGender)
    {
        return countOfGender
    }
    else
    {
        return null
    }
}

export async function getAllGender()
{
    await defaultGenderMaker()
    let genderList = await Gender.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (genderList)
    {
        return genderList
    }
    else
    {
        return null
    }
}

export async function getGenderByFilter(filter: any)
{
    let genderList = await Gender.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (genderList)
    {
        return genderList
    }
    else
    {
        return null
    }
}

export async function getGenderById(id: string)
{
    let currentGender = await Gender.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentGender)
    {
        return currentGender
    }
    else
    {
        return null
    }
}

export async function getGenderByTitle(title: string)
{
    let currentGender = await Gender.findOne({
        title: title
    })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentGender)
    {
        return currentGender
    }
    else
    {
        return null
    }
}

export async function getGenderByIdAndFilter(id: string, filter: any)
{

    let currentGender: any
    if (filter)
    {
        currentGender = await Gender.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentGender = getGenderById(id)
    }

    if (currentGender)
    {
        return currentGender
    }
    else
    {
        return null
    }
}

export async function addNewGender(entity: GenderAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfGenderWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentGender = new Gender({
            title: entity.title
        })
        let result = await currentGender.save()
        if (result)
        {
            console.log(result)
            return true
        }
        else
        {
            return false
        }
    }
    else
    {
        return false
    }

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

export async function updateExistGender(entity: GenderUpdateVm)
{
    let titleExist = await checkIfGenderWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentGender = await Gender.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentGender;
    }
    else
    {
        return false
    }
}

export async function deleteExistGender(entity: GenderDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Gender.findByIdAndRemove(entity.id)
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

async function checkIfGenderWithTheSameTitleExist(title: string)
{
    let currentGender = await Gender.findOne({
        title: title
    })
    return !!currentGender;
}