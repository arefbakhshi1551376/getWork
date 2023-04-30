import {SkillLevelAddVm, SkillLevelDeleteVm, SkillLevelUpdateVm} from "../type/skillLevel";
import {idIsNotValid} from "../validator";
import {getSkillById} from "./skill";
import {SkillLevel} from "../../mvc/model/skillLevel";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {LanguageLevel} from "../../mvc/model/languageLevel";
import {getLanguageById} from "./language";

export async function getCountOfSkillLevel()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfSkillLevel = await SkillLevel.count()
    if (countOfSkillLevel)
    {
        return countOfSkillLevel
    }
    else
    {
        addNewErrorMessage(`We can not get count of language level!`)
        return null
    }
}

export async function getAllSkillLevel()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let skillLevelList = await SkillLevel.find()
        .populate({
            path: 'skill',
            select: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (skillLevelList)
    {
        return skillLevelList
    }
    else
    {
        addNewErrorMessage(`We can not get list of language level!`)
        return null
    }
}

export async function getSkillLevelById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentSkillLevel = await SkillLevel.findById(id)
        .populate({
            path: 'skill',
            select: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentSkillLevel)
    {
        return currentSkillLevel
    }
    else
    {
        addNewErrorMessage(`We can not get current language level!`)
        return null
    }
}

export async function getSkillLevelByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let skillLevelList: any

    if (filter)
    {
        skillLevelList = await SkillLevel.find()
            .populate({
                path: 'skill',
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

    if (skillLevelList)
    {
        return skillLevelList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of language level!`)
        return null
    }
}

export async function getSkillLevelByIdAndFilter(id: string, filter: any)
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

    let currentSkillLevel: any
    if (filter)
    {
        currentSkillLevel = await SkillLevel.findById(id)
            .populate({
                path: 'skill',
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
        currentSkillLevel = await getSkillLevelById(id)
    }

    if (currentSkillLevel)
    {
        return currentSkillLevel
    }
    else
    {
        addNewErrorMessage(`We can not get current language level!`)
        return null
    }
}

export async function addNewSkillLevel(entity: SkillLevelAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentSkillLevelExists = await checkIfSkillLevelWithTheSamePropertiesExist(entity.skill, entity.level)
    if (currentSkillLevelExists)
    {
        addNewErrorMessage('An language level with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.skill))
    {
        addNewErrorMessage(`The id ${entity.skill} is invalid and can not be belonged to any language!`)
        return null
    }

    let currentSkill = await getSkillById(entity.skill)
    if (!currentSkill)
    {
        addNewErrorMessage('No city with the same id exists! So we can not add any language level with the city')
        return null
    }

    let currentSkillLevel = new SkillLevel({
        skill: entity.skill,
        level: entity.level,
        creator: entity.creator
    })
    let result = await currentSkillLevel.save()
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

export async function updateExistSkillLevel(entity: SkillLevelUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getSkillLevelById(entity.id)

    let currentSkillLevelExists = await checkIfSkillLevelWithTheSamePropertiesExist(entity.skill, entity.level)
    if (currentSkillLevelExists)
    {
        addNewErrorMessage('An language level with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.skill))
    {
        addNewErrorMessage(`The id ${entity.skill} is invalid and can not be belonged to any language!`)
        return null
    }

    let currentSkill = await getSkillById(entity.skill)
    if (!currentSkill)
    {
        addNewErrorMessage('No city with the same id exists! So we can not add any language level with the city')
        return null
    }

    let result = await SkillLevel.findByIdAndUpdate(
        entity.id,
        {
            skill: entity.skill,
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

export async function deleteExistSkillLevel(entity: SkillLevelDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getSkillLevelById(entity.id)

    let result = await SkillLevel.findByIdAndRemove(entity.id)
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


async function checkIfSkillLevelWithTheSamePropertiesExist(
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
