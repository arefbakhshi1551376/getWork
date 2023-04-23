import {Status} from "../../mvc/model/status";
import {StatusAddVm, StatusDeleteVm, StatusUpdateVm} from "../type/status";
import mongoose from "mongoose";
import {idIsNotValid} from "../validator";

export async function getCountOfStatus()
{
    let countOfStatus = await Status.count()
    if (countOfStatus)
    {
        return countOfStatus
    }
    else
    {
        return null
    }
}

export async function getAllStatus()
{
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
        return null
    }
}

export async function getStatusByFilter(filter: any)
{
    let statusList = await Status.find().select(`${filter}`)
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
        return null
    }
}

export async function getStatusById(id: string)
{
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
        return null
    }
}

export async function getStatusByIdAndFilter(id: string, filter: any)
{
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
        return null
    }
}

export async function getStatusByTitle(title: string)
{
    let currentStatus = await Status.find({
        title: title
    })
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
        return null
    }
}

export async function addNewStatus(entity: StatusAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfStatusWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentStatus = new Status({
            title: entity.title
        })
        let result = await currentStatus.save()
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

export async function updateExistStatus(entity: StatusUpdateVm)
{
    let titleExist = await checkIfStatusWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (!mongoose.isValidObjectId(entity.id))
        {
            return null
        }
        let currentStatus = await Status.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentStatus;
    }
    else
    {
        return false
    }
}

export async function deleteExistStatus(entity: StatusDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Status.findByIdAndRemove(entity.id)
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


async function checkIfStatusWithTheSameTitleExist(title: string)
{
    let currentStatus = await Status.findOne({
        title: title
    })
    return !!currentStatus;

}