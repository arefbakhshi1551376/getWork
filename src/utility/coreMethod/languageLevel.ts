import {LanguageLevel} from "../../mvc/model/languageLevel";
import {idIsNotValid} from "../validator";
import {LanguageLevelAddVm, LanguageLevelDeleteVm, LanguageLevelUpdateVm} from "../type/languageLevel";
import {getLanguageById} from "./language";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfLanguageLevel()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfLanguageLevel = await LanguageLevel.count()
    if (countOfLanguageLevel)
    {
        return countOfLanguageLevel
    }
    else
    {
        addNewErrorMessage(`We can not get count of language level!`)
        return null
    }
}

export async function getAllLanguageLevel()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let languageLevelList = await LanguageLevel.find()
        .populate({
            path: 'language',
            select: 'title'
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
        addNewErrorMessage(`We can not get list of language level!`)
        return null
    }
}

export async function getLanguageLevelById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentLanguageLevel = await LanguageLevel.findById(id)
        .populate({
            path: 'language',
            select: 'title'
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
        addNewErrorMessage(`We can not get current language level!`)
        return null
    }
}

export async function getLanguageLevelByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let languageLevelList: any

    if (filter)
    {
        languageLevelList = await LanguageLevel.find()
            .populate({
                path: 'language',
                select: 'title'
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

    if (languageLevelList)
    {
        return languageLevelList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of language level!`)
        return null
    }
}

export async function getLanguageLevelByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No language level with id ${id} exists!`)
        return null
    }

    let currentLanguageLevel: any
    if (filter)
    {
        currentLanguageLevel = await LanguageLevel.findById(id)
            .populate({
                path: 'language',
                select: 'title'
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
        currentLanguageLevel = await getLanguageLevelById(id)
    }

    if (currentLanguageLevel)
    {
        return currentLanguageLevel
    }
    else
    {
        addNewErrorMessage(`We can not get current language level!`)
        return null
    }
}

export async function addNewLanguageLevel(entity: LanguageLevelAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentLanguageLevelExists = await checkIfLanguageLevelWithTheSamePropertiesExist(entity.language, entity.level)
    if (currentLanguageLevelExists)
    {
        addNewErrorMessage('An language level with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.language))
    {
        addNewErrorMessage(`The id ${entity.language} is invalid and can not be belonged to any language!`)
        return null
    }

    let currentLanguage = await getLanguageById(entity.language)
    if (!currentLanguage)
    {
        addNewErrorMessage('No city with the same id exists! So we can not add any language level with the city')
        return null
    }

    let currentLanguageLevel = new LanguageLevel({
        language: entity.language,
        level: entity.level,
        creator: entity.creator
    })
    let result = await currentLanguageLevel.save()
    if (result)
    {
        addNewSuccessMessage('Language level added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the language level can not be saved!')
        return false
    }
}

export async function updateExistLanguageLevel(entity: LanguageLevelUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getLanguageLevelById(entity.id)

    let currentLanguageLevelExists = await checkIfLanguageLevelWithTheSamePropertiesExist(entity.language, entity.level)
    if (currentLanguageLevelExists)
    {
        addNewErrorMessage('An language level with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.language))
    {
        addNewErrorMessage(`The id ${entity.language} is invalid and can not be belonged to any language!`)
        return null
    }

    let currentLanguage = await getLanguageById(entity.language)
    if (!currentLanguage)
    {
        addNewErrorMessage('No city with the same id exists! So we can not add any language level with the city')
        return null
    }

    let result = await LanguageLevel.findByIdAndUpdate(
        entity.id,
        {
            language: entity.language,
            level: entity.level,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The language level updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The language level can not be updated!`)
        return false
    }
}

export async function deleteExistLanguageLevel(entity: LanguageLevelDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getLanguageLevelById(entity.id)

    let result = await LanguageLevel.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The language level deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The language level can not be deleted!`)
        return false
    }
}

async function checkIfLanguageLevelWithTheSamePropertiesExist(
    language: string,
    level: number
)
{
    let currentLanguageLevel = await LanguageLevel.findOne({
        language: language,
        level: level
    })
    return !!currentLanguageLevel;
}
