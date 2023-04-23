import {Language} from "../../mvc/model/language";
import {LanguageAddVm, LanguageDeleteVm, LanguageUpdateVm} from "../type/language";
import {idIsNotValid} from "../validator";

export async function getCountOfLanguage()
{
    let countOfLanguage = await Language.count()
    if (countOfLanguage)
    {
        return countOfLanguage
    }
    else
    {
        return null
    }
}

export async function getAllLanguage()
{
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
        return null
    }
}

export async function getLanguageByFilter(filter: any)
{
    let languageList = await Language.find().select(`${filter}`)
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
        return null
    }
}

export async function getLanguageByIdAndFilter(id: string, filter: any)
{
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
        return null
    }
}

export async function getLanguageById(id: string)
{
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
        return null
    }
}

export async function addNewLanguage(entity: LanguageAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfLanguageWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentLanguage = new Language({
            title: entity.title
        })
        let result = await currentLanguage.save()
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

export async function updateExistLanguage(entity: LanguageUpdateVm)
{
    let titleExist = await checkIfLanguageWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentLanguage = await Language.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentLanguage;
    }
    else
    {
        return false
    }
}

export async function deleteExistLanguage(entity: LanguageDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Language.findByIdAndRemove(entity.id)
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

async function checkIfLanguageWithTheSameTitleExist(title: string)
{
    let currentLanguage = await Language.findOne({
        title: title
    })
    return !!currentLanguage;
}