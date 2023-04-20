import {Skill} from "../../mvc/model/skill";
import {SkillAddVm, SkillDeleteVm, SkillUpdateVm} from "../type/skill";
import {idIsNotValid} from "../validator";

export async function getCountOfSkill()
{
    let countOfSkill = await Skill.count()
    if (countOfSkill)
    {
        return countOfSkill
    }
    else
    {
        return null
    }
}

export async function getAllSkill()
{
    let skillList = await Skill.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (skillList)
    {
        return skillList
    }
    else
    {
        return null
    }
}

export async function getSkillByFilter(filter: any)
{
    let skillList = await Skill.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (skillList)
    {
        return skillList
    }
    else
    {
        return null
    }
}

export async function getSkillById(id: string)
{
    let currentSkill = await Skill.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentSkill)
    {
        return currentSkill
    }
    else
    {
        return null
    }
}

export async function getSkillByIdAndFilter(id: string, filter: any)
{
    let currentSkill: any
    if (filter)
    {
        currentSkill = await Skill.findById(id).select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentSkill = await Skill.findById(id)
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentSkill)
    {
        return currentSkill
    }
    else
    {
        return null
    }
}

export async function addNewSkill(entity: SkillAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfSkillWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentSkill = new Skill({
            title: entity.title
        })
        let result = await currentSkill.save()
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

export async function updateExistSkill(entity: SkillUpdateVm)
{
    let titleExist = await checkIfSkillWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentSkill = await Skill.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentSkill;
    }
    else
    {
        return false
    }
}

export async function deleteExistSkill(entity: SkillDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Skill.findByIdAndRemove(entity.id)
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

async function checkIfSkillWithTheSameTitleExist(title: string)
{
    let currentSkill = await Skill.findOne({
        title: title
    })
    return !!currentSkill;

}
