import {Gender} from "../../mvc/model/gender";
import {GenderAddVm, GenderDeleteVm, GenderUpdateVm} from "../type/gender";
import {idIsNotValid} from "../validator";
import {defaultGenderMaker} from "../maker";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfGender()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    await defaultGenderMaker()
    let countOfGender = await Gender.count()
    if (countOfGender)
    {
        return countOfGender
    }
    else
    {
        addNewErrorMessage(`We can not get count of gender!`)
        return null
    }
}

export async function getAllGender()
{
    emptyMessageList()

    await defaultGenderMaker()
    let genderList = await Gender.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (genderList)
    {
        return genderList
    }
    else
    {
        addNewErrorMessage(`We can not get list of gender!`)
        return null
    }
}

export async function getGenderById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentGender = await Gender.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentGender)
    {
        return currentGender
    }
    else
    {
        addNewErrorMessage(`We can not get current gender!`)
        return null
    }
}

export async function getGenderByTitle(title: any)
{
    emptyMessageList()

    let currentGender: any
    if (title)
    {
        currentGender = await Gender.findOne({
            title: title
        })
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter a title!`)
        return null
    }

    if (currentGender)
    {
        return currentGender
    }
    else
    {
        addNewErrorMessage(`We can\`t get current gender!`)
        return null
    }
}

export async function getGenderByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let genderList: any
    if (filter)
    {
        genderList = await Gender.find().select(`${filter}`)
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

    if (genderList)
    {
        return genderList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of gender!`)
        return null
    }
}

export async function getGenderByIdAndFilter(id: string, filter: any)
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

    let currentGender: any
    if (filter)
    {
        currentGender = await Gender.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentGender = getGenderById(id)
    }

    if (currentGender)
    {
        return currentGender
    }
    else
    {
        addNewErrorMessage(`We can not get current gender!`)
        return null
    }
}

export async function addNewGender(entity: GenderAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentGenderExists = await checkIfGenderWithTheSameTitleExist(entity.title)
    if (currentGenderExists)
    {
        addNewErrorMessage('An gender with the same properties exists!')
        return null
    }

    let currentGender = new Gender({
        title: entity.title
    })
    let result = await currentGender.save()
    if (result)
    {
        addNewSuccessMessage('Gender added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the gender can not be saved!')
        return false
    }
}

export async function updateExistGender(entity: GenderUpdateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getGenderById(entity.id)

    let currentGenderExists = await checkIfGenderWithTheSameTitleExist(entity.title)
    if (currentGenderExists)
    {
        addNewErrorMessage('An gender with the same properties exists!')
        return null
    }

    let result = await Gender.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The gender updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The gender can not be updated!`)
        return false
    }
}

export async function deleteExistGender(entity: GenderDeleteVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getGenderById(entity.id)

    let result = await Gender.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The gender deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The gender can not be deleted!`)
        return false
    }
}

async function checkIfGenderWithTheSameTitleExist(title: string)
{
    let currentGender = await Gender.findOne({
        title: title
    })
    return !!currentGender;
}