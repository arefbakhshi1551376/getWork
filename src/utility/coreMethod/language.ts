import {Language} from "../../mvc/model/language";
import {LanguageAddVm, LanguageDeleteVm, LanguageUpdateVm} from "../type/language";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfLanguage()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfLanguage = await Language.count()
    if (countOfLanguage)
    {
        return countOfLanguage
    }
    else
    {
        addNewErrorMessage(`We can not get count of address!`)
        return null
    }
}

export async function getAllLanguage()
{
    emptyMessageList()

    let languageList = await Language.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (languageList)
    {
        return languageList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function getLanguageById(id: string)
{
    emptyMessageList()

    let currentLanguage = await Language.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentLanguage)
    {
        return currentLanguage
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getLanguageByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let languageList: any
    if (filter)
    {
        languageList = await Language.find().select(`${filter}`)
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

    if (languageList)
    {
        return languageList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of address!`)
        return null
    }
}

export async function getLanguageByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No address with id ${id} exists!`)
        return null
    }

    let languageList: any
    if (filter)
    {
        languageList = await Language.find().select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        languageList = getLanguageById(id)
    }


    if (languageList)
    {
        return languageList
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function addNewLanguage(entity: LanguageAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentLanguageExists = await checkIfLanguageWithTheSameTitleExist(entity.title)
    if (currentLanguageExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let currentLanguage = new Language({
        title: entity.title
    })
    let result = await currentLanguage.save()
    if (result)
    {
        addNewSuccessMessage('Address added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the address can not be saved!')
        return false
    }
}

export async function updateExistLanguage(entity: LanguageUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getLanguageById(entity.id)

    let currentLanguageExists = await checkIfLanguageWithTheSameTitleExist(entity.title)
    if (currentLanguageExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let result = await Language.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The address updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be updated!`)
        return false
    }
}

export async function deleteExistLanguage(entity: LanguageDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getLanguageById(entity.id)

    let result = await Language.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The address deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be deleted!`)
        return false
    }
}

async function checkIfLanguageWithTheSameTitleExist(title: string)
{
    let currentLanguage = await Language.findOne({
        title: title
    })
    return !!currentLanguage;
}