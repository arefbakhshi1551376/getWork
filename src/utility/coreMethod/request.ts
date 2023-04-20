import {Request} from "../../mvc/model/request";
import {idIsNotValid} from "../validator";
import {JobAd} from "../../mvc/model/jobAd";
import {RequestAddVm, RequestDeleteVm, RequestUpdateVm} from "../type/request";
import {getUserById} from "./user";
import {getJobAdById} from "./jobAd";
import {User} from "../type/user";
import {Status} from "../type/status";
import {getStatusById, getStatusByTitle} from "./status";

export async function getCountOfRequest()
{
    let countOfRequest = await Request.count()
    if (countOfRequest)
    {
        return countOfRequest
    }
    else
    {
        return null
    }
}

export async function getAllRequest()
{
    let requestList = await Request.find() // TODO: Check if it works!
        .populate({
            path: 'User',
            populate: 'name family userName'
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'Status',
            populate: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (requestList)
    {
        return requestList
    }
    else
    {
        return null
    }
}

export async function getRequestByFilter(filter: any)
{
    let requestList = await Request.find()
        .populate({
            path: 'User',
            populate: 'name family userName'
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'Status',
            populate: 'title'
        })
        .select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (requestList)
    {
        return requestList
    }
    else
    {
        return null
    }
}

export async function getRequestById(id: string)
{
    let currentRequest = await Request.findById(id)
        .populate({
            path: 'User',
            populate: 'name family userName'
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'Status',
            populate: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentRequest)
    {
        return currentRequest
    }
    else
    {
        return null
    }
}

export async function getRequestByJobAdId(jobAdId: string)
{
    let currentRequest = await Request.find({
        jobAd: jobAdId
    })
        .populate({
            path: 'User',
            populate: 'name family userName'
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'Status',
            populate: 'title'
        })
        .select('id')
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentRequest)
    {
        return currentRequest
    }
    else
    {
        return null
    }
}

export async function getRequestByIdAndFilter(id: string, filter: any)
{
    let currentRequest: any
    if (filter)
    {
        currentRequest = await Request.findById(id)
            .populate({
                path: 'User',
                populate: 'name family userName'
            })
            .populate({
                path: 'Request',
                populate: {
                    path: 'Introduction',
                    populate: 'title description'
                }
            })
            .populate({
                path: 'Status',
                populate: 'title'
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
        currentRequest = await Request.findById(id)
            .populate({
                path: 'User',
                populate: 'name family userName'
            })
            .populate({
                path: 'Request',
                populate: {
                    path: 'Introduction',
                    populate: 'title description'
                }
            })
            .populate({
                path: 'Status',
                populate: 'title'
            })
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentRequest)
    {
        return currentRequest
    }
    else
    {
        return null
    }
}

export async function addNewRequest(entity: RequestAddVm): Promise<null | boolean>
{
    if (
        idIsNotValid(entity.user) ||
        idIsNotValid(entity.jobAd)
    )
    {
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
        return null
    }

    let currentJobAd = await getJobAdById(entity.jobAd)
    if (!currentJobAd)
    {
        return null
    }

    let defaultStatus = await getStatusByTitle('Verify Expected')

    let currentRequest: any
    if (defaultStatus)
    {
        currentRequest = new JobAd({
            user: entity.user,
            jobAd: entity.jobAd,
            status: [
                defaultStatus['id']
            ],
        });
    }
    let result = await currentRequest.save()
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

export async function updateExistRequest(entity: RequestUpdateVm)
{
    if (
        idIsNotValid(entity.user) ||
        idIsNotValid(entity.jobAd) ||
        idIsNotValid(entity.status)
    )
    {
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
        return null
    }

    let currentJobAd = await getJobAdById(entity.jobAd)
    if (!currentJobAd)
    {
        return null
    }

    let currentStatus = await getStatusById(entity.status)
    if (!currentStatus)
    {
        return null
    }

    let previousRequest = await Request.findById(entity.id)
    let previousRequestStatus: string[] = previousRequest['statusbar'] as string[]
    if (!previousRequestStatus.includes(entity.status))
    {
        previousRequestStatus.push(entity.status)
    }

    let currentRequest = await Request.findByIdAndUpdate(
        entity.id,
        {
            user: entity.user,
            jobAd: entity.jobAd,
            status: previousRequestStatus,
            updateDate: entity.updateDate
        }
    )
    return !!currentRequest;
}

export async function deleteExistRequest(entity: RequestDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Request.findByIdAndRemove(entity.id)
    return !!result;
}