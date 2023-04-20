import {SeniorityLevel} from "../../mvc/model/seniorityLevel";
import {SeniorityLevelAddVm, SeniorityLevelDeleteVm, SeniorityLevelUpdateVm} from "../type/seniorityLevel";
import {idIsNotValid} from "../validator";

export async function getCountOfSeniorityLevel()
{
    let countOfSeniorityLevel = await SeniorityLevel.count()
    if (countOfSeniorityLevel)
    {
        return countOfSeniorityLevel
    }
    else
    {
        return null
    }
}

export async function getAllSeniorityLevel()
{
    let seniorityLevelList = await SeniorityLevel.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (seniorityLevelList)
    {
        return seniorityLevelList
    }
    else
    {
        return null
    }
}

export async function getSeniorityLevelByFilter(filter: any)
{
    let seniorityLevelList = await SeniorityLevel.find()
        .select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (seniorityLevelList)
    {
        return seniorityLevelList
    }
    else
    {
        return null
    }
}

export async function getSeniorityLevelById(id: string)
{
    let currentSeniorityLevel = await SeniorityLevel.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentSeniorityLevel)
    {
        return currentSeniorityLevel
    }
    else
    {
        return null
    }
}

export async function getSeniorityLevelByIdAndFilter(id: string, filter: any)
{
    let currentSeniorityLevel: any
    if (filter)
    {
        currentSeniorityLevel = await SeniorityLevel.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentSeniorityLevel = await SeniorityLevel.findById(id)
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentSeniorityLevel)
    {
        return currentSeniorityLevel
    }
    else
    {
        return null
    }
}

export async function addNewSeniorityLevel(entity: SeniorityLevelAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfSeniorityLevelWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentSeniorityLevel = new SeniorityLevel({
            title: entity.title,
        })
        let result = await currentSeniorityLevel.save()
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

export async function updateExistSeniorityLevel(entity: SeniorityLevelUpdateVm)
{
    let titleExist = await checkIfSeniorityLevelWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentSeniorityLevel = await SeniorityLevel.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentSeniorityLevel;
    }
    else
    {
        return false
    }
}

export async function deleteExistSeniorityLevel(entity: SeniorityLevelDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await SeniorityLevel.findByIdAndRemove(entity.id)
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

async function checkIfSeniorityLevelWithTheSameTitleExist(title: string)
{
    let currentSeniorityLevel = await SeniorityLevel.findOne({
        title: title
    })
    return !!currentSeniorityLevel;

}
