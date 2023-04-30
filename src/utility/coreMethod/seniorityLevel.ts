import {SeniorityLevel} from "../../mvc/model/seniorityLevel";
import {SeniorityLevelAddVm, SeniorityLevelDeleteVm, SeniorityLevelUpdateVm} from "../type/seniorityLevel";
import {idIsNotValid} from "../validator";
import {defaultSeniorityLevelMaker} from "../maker";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfSeniorityLevel()
{
    emptyMessageList()
    await defaultSeniorityLevelMaker()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfSeniorityLevel = await SeniorityLevel.count()
    if (countOfSeniorityLevel)
    {
        return countOfSeniorityLevel
    }
    else
    {
        addNewErrorMessage(`We can not get count of country`)
        return null
    }
}

export async function getAllSeniorityLevel()
{
    emptyMessageList()
    await defaultSeniorityLevelMaker()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getSeniorityLevelById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`The id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function getSeniorityLevelByTitle(title: any)
{
    emptyMessageList()
    if (!title)
    {
        addNewErrorMessage(`You have to enter a title!`)
        return null
    }

    let seniorityLevelList = await SeniorityLevel.findOne({
        title: title
    })
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
        addNewErrorMessage(`We can not get current seniority level!`)
        return null
    }
}

export async function getSeniorityLevelByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let seniorityLevelList: any
    if (filter)
    {
        seniorityLevelList = await SeniorityLevel.find()
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

    if (seniorityLevelList)
    {
        return seniorityLevelList
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getSeniorityLevelByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        currentSeniorityLevel = await getSeniorityLevelById(id)
    }

    if (currentSeniorityLevel)
    {
        return currentSeniorityLevel
    }
    else
    {
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function addNewSeniorityLevel(entity: SeniorityLevelAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentSeniorityLevelExists = await checkIfSeniorityLevelWithTheSameTitleExist(entity.title)
    if (currentSeniorityLevelExists)
    {
        addNewErrorMessage(`The seniority level with the same properties exists!`)
        return null
    }

    let currentSeniorityLevel = new SeniorityLevel({
        title: entity.title,
        creator: entity.creator
    })
    let result = await currentSeniorityLevel.save()
    if (result)
    {
        addNewSuccessMessage(`Current country added successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The country can not be added!`)
        return false
    }
}

export async function updateExistSeniorityLevel(entity: SeniorityLevelUpdateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }

    await getSeniorityLevelById(entity.id)

    let currentSeniorityLevelExists = await checkIfSeniorityLevelWithTheSameTitleExist(entity.title)
    if (currentSeniorityLevelExists)
    {
        addNewErrorMessage(`The seniority level with the same properties exists!`)
        return null
    }

    let result = await SeniorityLevel.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`Current country updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The country can not be updated!`)
        return false
    }
}

export async function deleteExistSeniorityLevel(entity: SeniorityLevelDeleteVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }

    await getSeniorityLevelById(entity.id)

    let result = await SeniorityLevel.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`Current country deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The country can not be deleted!`)
        return false
    }
}

async function checkIfSeniorityLevelWithTheSameTitleExist(title: string)
{
    let currentSeniorityLevel = await SeniorityLevel.findOne({
        title: title
    })
    return !!currentSeniorityLevel;

}
