import {Skill} from "../../mvc/model/skill";
import {SkillAddVm, SkillDeleteVm, SkillUpdateVm} from "../type/skill";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfSkill()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfSkill = await Skill.count()
    if (countOfSkill)
    {
        return countOfSkill
    }
    else
    {
        addNewErrorMessage(`We can not get count of country`)
        return null
    }
}

export async function getAllSkill()
{
    emptyMessageList()

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
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getSkillById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`The id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function getSkillByFilter(filter: any)
{
    emptyMessageList()

    let skillList: any
    if (filter)
    {
        skillList = await Skill.find().select(`${filter}`)
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

    if (skillList)
    {
        return skillList
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getSkillByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()

    let currentSkill: any
    if (filter)
    {
        currentSkill = await Skill.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentSkill = await getSkillById(id)
    }

    if (currentSkill)
    {
        return currentSkill
    }
    else
    {
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function addNewSkill(entity: SkillAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentSkillExists = await checkIfSkillWithTheSameTitleExist(entity.title)
    if (currentSkillExists)
    {
        addNewErrorMessage(`The country with the same properties exists!`)
        return null
    }

    let currentSkill = new Skill({
        title: entity.title,
        creator: entity.creator
    })
    let result = await currentSkill.save()
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

export async function updateExistSkill(entity: SkillUpdateVm)
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

    await getSkillById(entity.id)

    let currentSkillExists = await checkIfSkillWithTheSameTitleExist(entity.title)
    if (currentSkillExists)
    {
        addNewErrorMessage(`The country with the same properties exists!`)
        return null
    }

    let result = await Skill.findByIdAndUpdate(
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

export async function deleteExistSkill(entity: SkillDeleteVm)
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

    await getSkillById(entity.id)

    let result = await Skill.findByIdAndRemove(entity.id)
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

async function checkIfSkillWithTheSameTitleExist(title: string)
{
    let currentSkill = await Skill.findOne({
        title: title
    })
    return !!currentSkill;

}
