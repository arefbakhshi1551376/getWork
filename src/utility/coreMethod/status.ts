import {Status} from "../../mvc/model/status";
import {StatusAddVm, StatusDeleteVm, StatusUpdateVm} from "../type/status";
import mongoose from "mongoose";
import {idIsNotValid} from "../validator";
import {defaultStatusMaker} from "../maker";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfStatus()
{
    await defaultStatusMaker()

    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfStatus = await Status.count()
    if (countOfStatus)
    {
        return countOfStatus
    }
    else
    {
        addNewErrorMessage(`We can not get count of country`)
        return null
    }
}

export async function getAllStatus()
{
    await defaultStatusMaker()

    emptyMessageList()

    let statusList = await Status.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (statusList)
    {
        return statusList
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getStatusById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`The id ${id} is not valid!`)
        return null
    }

    let currentStatus = await Status.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentStatus)
    {
        return currentStatus
    }
    else
    {
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function getStatusByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let statusList: any
    if (filter)
    {
        statusList = await Status.find().select(`${filter}`)
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

    if (statusList)
    {
        return statusList
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getStatusByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`The id ${id} is not valid!`)
        return null
    }

    let currentStatus: any
    if (filter)
    {
        currentStatus = await Status.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentStatus = await getStatusById(id)
    }


    if (currentStatus)
    {
        return currentStatus
    }
    else
    {
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function getStatusByTitle(title: any)
{
    emptyMessageList()

    if (!title)
    {
        addNewErrorMessage(`You have to enter a title!`)
        return null
    }

    let currentStatus = await Status.findOne({
        title: title
    })
        .sort(
            {
                'createDate': -1
            }
        );

    if (currentStatus)
    {
        return currentStatus
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function addNewStatus(entity: StatusAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentStatusExists = await checkIfStatusWithTheSameTitleExist(entity.title)
    if (currentStatusExists)
    {
        addNewErrorMessage(`The country with the same properties exists!`)
        return null
    }

    let currentStatus = new Status({
        title: entity.title,
        creator: entity.creator
    })
    let result = await currentStatus.save()
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

export async function updateExistStatus(entity: StatusUpdateVm)
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

    await getStatusById(entity.id)

    let currentStatusExists = await checkIfStatusWithTheSameTitleExist(entity.title)
    if (currentStatusExists)
    {
        addNewErrorMessage(`The country with the same properties exists!`)
        return null
    }

    let result = await Status.findByIdAndUpdate(
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

export async function deleteExistStatus(entity: StatusDeleteVm)
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

    await getStatusById(entity.id)

    let result = await Status.findByIdAndRemove(entity.id)
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

async function checkIfStatusWithTheSameTitleExist(title: string)
{
    let currentStatus = await Status.findOne({
        title: title
    })
    return !!currentStatus;

}