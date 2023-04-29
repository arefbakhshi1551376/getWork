import {JobTime} from "../../mvc/model/jobTime";
import {JobTimeAddVm, JobTimeDeleteVm, JobTimeUpdateVm} from "../type/jobTime";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfJobTime()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfJobTime = await JobTime.count()
    if (countOfJobTime)
    {
        return countOfJobTime
    }
    else
    {
        addNewErrorMessage(`We can not get count of address!`)
        return null
    }
}

export async function getAllJobTime()
{
    emptyMessageList()

    let jobTimeList = await JobTime.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (jobTimeList)
    {
        return jobTimeList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function getJobTimeById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentJobTime = await JobTime.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentJobTime)
    {
        return currentJobTime
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getJobTimeByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let jobTimeList: any

    if (filter)
    {
        jobTimeList = await JobTime.find().select(`${filter}`)
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

    if (jobTimeList)
    {
        return jobTimeList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of address!`)
        return null
    }
}

export async function getJobTimeByIdAndFilter(id: string, filter: any)
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

    let jobTimeList: any
    if (filter)
    {
        jobTimeList = await JobTime.find().select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        jobTimeList = getJobTimeById(id)
    }


    if (jobTimeList)
    {
        return jobTimeList
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function addNewJobTime(entity: JobTimeAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentJobTimeExists = await checkIfJobTimeWithTheSameTitleExist(entity.title)
    if (currentJobTimeExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let currentJobTime = new JobTime({
        title: entity.title
    })
    let result = await currentJobTime.save()
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

export async function updateExistJobTime(entity: JobTimeUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getJobTimeById(entity.id)

    let currentJobTimeExists = await checkIfJobTimeWithTheSameTitleExist(entity.title)
    if (currentJobTimeExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let result = await JobTime.findByIdAndUpdate(
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

export async function deleteExistJobTime(entity: JobTimeDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getJobTimeById(entity.id)

    let result = await JobTime.findByIdAndRemove(entity.id)
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

async function checkIfJobTimeWithTheSameTitleExist(title: string)
{
    let currentJobTime = await JobTime.findOne({
        title: title
    })
    return !!currentJobTime;
}