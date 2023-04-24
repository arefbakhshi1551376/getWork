import {UserRequest} from "../../mvc/model/userRequest";
import {idIsNotValid} from "../validator";
import {JobAd} from "../../mvc/model/jobAd";
import {RequestAddVm, RequestDeleteVm, RequestUpdateVm} from "../type/request";
import {getJobAdById} from "./jobAd";
import {User} from "../type/user";
import {Status} from "../type/status";
import {getStatusById, getStatusByTitle} from "./status";
import {getUserById} from "./user";

export async function getCountOfRequest()
{
    let countOfRequest = await UserRequest.count()
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
    let requestList = await UserRequest.find() // TODO: Check if it works!
        .populate({
            path: 'user',
            populate: 'name family userName'
        })
        .populate({
            path: 'jobAd',
            populate: {
                path: 'introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'status',
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
    let requestList = await UserRequest.find()
        .populate({
            path: 'user',
            populate: 'name family userName'
        })
        .populate({
            path: 'jobAd',
            populate: {
                path: 'introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'status',
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
    let currentRequest = await UserRequest.findById(id)
        .populate({
            path: 'user',
            populate: 'name family userName'
        })
        .populate({
            path: 'jobAd',
            populate: {
                path: 'introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'status',
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
    let currentRequest = await UserRequest.find({
        jobAd: jobAdId
    })
        .populate({
            path: 'user',
            populate: 'name family userName'
        })
        .populate({
            path: 'jobAd',
            populate: {
                path: 'introduction',
                populate: 'title description'
            }
        })
        .populate({
            path: 'status',
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

export async function getRequestIdListByJobAdId(jobAdId: string)
{
    let currentRequest = await UserRequest.find({
        jobAd: jobAdId
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
        currentRequest = await UserRequest.findById(id)
            .populate({
                path: 'user',
                populate: 'name family userName'
            })
            .populate({
                path: 'jobAd',
                populate: {
                    path: 'introduction',
                    populate: 'title description'
                }
            })
            .populate({
                path: 'status',
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
        currentRequest = await getRequestById(id)
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
        currentRequest = new UserRequest({
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
        console.log('User id or job ad id or status id is invalid!')
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
        console.log('User is not exist!')
        return null
    }

    let currentJobAd = await getJobAdById(entity.jobAd)
    if (!currentJobAd)
    {
        console.log('Job ad is not exist!')
        return null
    }

    let currentStatus = await getStatusById(entity.status)
    if (!currentStatus)
    {
        console.log('Status is not exist!')
        return null
    }

    let previousRequestNewStatusList = await addNewStatusToRequestStatusList(entity.id, entity.status)

    let currentRequest = await UserRequest.findByIdAndUpdate(
        entity.id,
        {
            user: entity.user,
            jobAd: entity.jobAd,
            status: previousRequestNewStatusList,
            updateDate: entity.updateDate
        }
    )
    return !!currentRequest;
}

export async function addNewStatusToRequestStatusList(requestId: string, newStatusId: string)
{
    let oldStatusList = await UserRequest.findById(requestId)
        .select('status')
    // let currentUserIpList = oldStatusList!['status'] as Array<string>
    // currentUserIpList.push(newStatusId)
    console.log(oldStatusList)
    // return currentUserIpList
}

export async function deleteExistRequest(entity: RequestDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await UserRequest.findByIdAndRemove(entity.id)
    return !!result;
}

export async function deleteExistRequestByJobAd(jobAdId: string)
{
    if (idIsNotValid(jobAdId))
    {
        return null
    }
    let result = UserRequest.deleteMany({
        jobAd: jobAdId
    })
    return !!result;
}