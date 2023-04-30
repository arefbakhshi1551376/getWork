import {JobPlace} from "../../mvc/model/jobPlace";
import {JobPlaceAddVm, JobPlaceDeleteVm, JobPlaceUpdateVm} from "../type/jobPlace";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfJobPlace()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfJobPlace = await JobPlace.count()
    if (countOfJobPlace)
    {
        return countOfJobPlace
    }
    else
    {
        addNewErrorMessage(`We can not get count of address!`)
        return null
    }
}

export async function getAllJobPlace()
{
    emptyMessageList()

    let jobPlaceList = await JobPlace.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (jobPlaceList)
    {
        return jobPlaceList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function getJobPlaceById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentJobPlace = await JobPlace.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentJobPlace)
    {
        return currentJobPlace
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getJobPlaceByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let jobPlaceList: any

    if (filter)
    {
        jobPlaceList = await JobPlace.find().select(`${filter}`)
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

    if (jobPlaceList)
    {
        return jobPlaceList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of address!`)
        return null
    }
}

export async function getJobPlaceByIdAndFilter(id: string, filter: any)
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

    let currentJobPlace: any
    if (filter)
    {
        currentJobPlace = await JobPlace.find().select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentJobPlace = getJobPlaceById(id)
    }


    if (currentJobPlace)
    {
        return currentJobPlace
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function addNewJobPlace(entity: JobPlaceAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentJobPlaceExists = await checkIfJobPlaceWithTheSameTitleExist(entity.title)
    if (currentJobPlaceExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let currentJobPlace = new JobPlace({
        title: entity.title,
        creator: entity.creator
    })
    let result = await currentJobPlace.save()
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

export async function updateExistJobPlace(entity: JobPlaceUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getJobPlaceById(entity.id)

    let currentJobPlaceExists = await checkIfJobPlaceWithTheSameTitleExist(entity.title)
    if (currentJobPlaceExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let result = await JobPlace.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            updater: entity.updater,
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

export async function deleteExistJobPlace(entity: JobPlaceDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getJobPlaceById(entity.id)

    let result = await JobPlace.findByIdAndRemove(entity.id)
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

async function checkIfJobPlaceWithTheSameTitleExist(title: string)
{
    let currentJobPlace = await JobPlace.findOne({
        title: title
    })
    return !!currentJobPlace;
}