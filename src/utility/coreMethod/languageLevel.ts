import {LanguageLevel} from "../../mvc/model/languageLevel";
import {idIsNotValid} from "../validator";
import {LanguageLevelAddVm, LanguageLevelDeleteVm, LanguageLevelUpdateVm} from "../type/languageLevel";
import {getLanguageById} from "./language";

export async function getCountOfLanguageLevel()
{
    let countOfLanguageLevel = await LanguageLevel.count()
    if (countOfLanguageLevel)
    {
        return countOfLanguageLevel
    }
    else
    {
        return null
    }
}

export async function getAllLanguageLevel()
{
    let languageLevelList = await LanguageLevel.find()
        .populate({
            path: 'Language',
            populate: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (languageLevelList)
    {
        return languageLevelList
    }
    else
    {
        return null
    }
}

export async function getLanguageLevelByFilter(filter: any)
{
    let languageLevelList = await LanguageLevel.find()
        .populate({
            path: 'Language',
            populate: 'title'
        })
        .select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (languageLevelList)
    {
        return languageLevelList
    }
    else
    {
        return null
    }
}

export async function getLanguageLevelById(id: string)
{
    let currentLanguageLevel = await LanguageLevel.findById(id)
        .populate({
            path: 'Language',
            populate: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentLanguageLevel)
    {
        return currentLanguageLevel
    }
    else
    {
        return null
    }
}

export async function getLanguageLevelByIdAndFilter(id: string, filter: any)
{
    let currentLanguageLevel: any
    if (filter)
    {
        currentLanguageLevel = await LanguageLevel.findById(id)
            .populate({
                path: 'Language',
                populate: 'title'
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
        currentLanguageLevel = await LanguageLevel.findById(id)
            .populate({
                path: 'Language',
                populate: 'title'
            })
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentLanguageLevel)
    {
        return currentLanguageLevel
    }
    else
    {
        return null
    }
}

export async function addNewLanguageLevel(entity: LanguageLevelAddVm): Promise<null | boolean>
{
    if (idIsNotValid(entity.language))
    {
        return null
    }
    let currentLanguage = await getLanguageById(entity.language)
    if (currentLanguage)
    {
        let currentLanguageLevel = new LanguageLevel({
            language: entity.language,
            level: entity.level
        })
        let result = await currentLanguageLevel.save()
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

export async function updateExistLanguageLevel(entity: LanguageLevelUpdateVm)
{
    if (idIsNotValid(entity.id) || idIsNotValid(entity.language))
    {
        return null
    }
    let currentLanguage = await getLanguageById(entity.language)
    if (currentLanguage)
    {
        let currentLanguageLevel = await LanguageLevel.findByIdAndUpdate(
            entity.id,
            {
                language: entity.language,
                level: entity.level,
                updateDate: entity.updateDate
            }
        )
        return !!currentLanguageLevel;
    }
    return false
}

export async function deleteExistLanguageLevel(entity: LanguageLevelDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await LanguageLevel.findByIdAndRemove(entity.id)
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
