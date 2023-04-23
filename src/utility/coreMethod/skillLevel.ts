import {SkillLevelAddVm, SkillLevelDeleteVm, SkillLevelUpdateVm} from "../type/skillLevel";
import {idIsNotValid} from "../validator";
import {getSkillById} from "./skill";
import {SkillLevel} from "../../mvc/model/skillLevel";

export async function getCountOfSkillLevel()
{
    let countOfSkillLevel = await SkillLevel.count()
    if (countOfSkillLevel)
    {
        return countOfSkillLevel
    }
    else
    {
        return null
    }
}

export async function getAllSkillLevel()
{
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
        return null
    }
}

export async function getSkillLevelByFilter(filter: any)
{
    let skillLevelList = await SkillLevel.find()
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

    if (skillLevelList)
    {
        return skillLevelList
    }
    else
    {
        return null
    }
}

export async function getSkillLevelById(id: string)
{
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
        return null
    }
}

export async function getSkillLevelByIdAndFilter(id: string, filter: any)
{
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
        return null
    }
}

export async function addNewSkillLevel(entity: SkillLevelAddVm): Promise<null | boolean>
{
    if (idIsNotValid(entity.skill))
    {
        return null
    }
    let currentSkill = await getSkillById(entity.skill)
    if (currentSkill)
    {
        let currentSkillLevel = new SkillLevel({
            skill: entity.skill,
            level: entity.level
        })
        let result = await currentSkillLevel.save()
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

export async function updateExistSkillLevel(entity: SkillLevelUpdateVm)
{
    if (idIsNotValid(entity.id) || idIsNotValid(entity.skill))
    {
        return null
    }
    let currentSkill = await getSkillById(entity.skill)
    if (currentSkill)
    {
        let currentSkillLevel = await SkillLevel.findByIdAndUpdate(
            entity.id,
            {
                skill: entity.skill,
                level: entity.level,
                updateDate: entity.updateDate
            }
        )
        return !!currentSkillLevel;
    }
    return false
}

export async function deleteExistSkillLevel(entity: SkillLevelDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await SkillLevel.findByIdAndRemove(entity.id)
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
