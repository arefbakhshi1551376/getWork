import {UserRequest} from "../../mvc/model/userRequest";
import {idIsNotValid} from "../validator";
import {RequestAddVm, RequestDeleteVm, RequestUpdateVm} from "../type/request";
import {getJobAdById} from "./jobAd";
import {getStatusById, getStatusByTitle} from "./status";
import {getUserById} from "./user";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {defaultStatusMaker} from "../maker";

export async function getCountOfRequest()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfRequest = await UserRequest.count()
    if (countOfRequest)
    {
        return countOfRequest
    }
    else
    {
        addNewErrorMessage(`We can not get count of request!`)
        return null
    }
}

export async function getAllRequest()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        addNewErrorMessage(`We can not get list of request!`)
        return null
    }
}

export async function getRequestById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current request!`)
        return null
    }
}

export async function getRequestByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let requestList: any

    if (filter)
    {
        requestList = await UserRequest.find()
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
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter a filter!`)
        return null
    }


    if (requestList)
    {
        return requestList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of request!`)
        return null
    }
}

export async function getRequestByJobAdId(jobAdId: string)
{
    emptyMessageList()
    if (idIsNotValid(jobAdId))
    {
        addNewErrorMessage(`Id ${jobAdId} is not valid!`)
        return null
    }

    let currentJobAd = await getJobAdById(jobAdId)
    if (!currentJobAd)
    {
        addNewErrorMessage(`The id ${jobAdId} is invalid and can not be belonged to any city!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current request!`)
        return null
    }
}

export async function getRequestByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No request with id ${id} exists!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current request!`)
        return null
    }
}

export async function addNewRequest(entity: RequestAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentRequestExists = await checkIfUserRequestWithTheSamePropertiesExist(entity.jobAd, entity.user)
    if (currentRequestExists)
    {
        addNewErrorMessage('An request with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.user))
    {
        addNewErrorMessage(`The id ${entity.user} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
        addNewErrorMessage('No user with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.jobAd))
    {
        addNewErrorMessage(`The id ${entity.jobAd} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentJobAd = await getJobAdById(entity.jobAd)
    if (!currentJobAd)
    {
        addNewErrorMessage('No job ad with the same id exists!')
        return null
    }

    let defaultStatus: any = await getStatusByTitle('Verify Expected')
    if (!defaultStatus)
    {
        await defaultStatusMaker()
        defaultStatus = await getStatusByTitle('Verify Expected')
    }

    let currentRequest: any
    if (defaultStatus)
    {
        currentRequest = new UserRequest({
            user: entity.user,
            jobAd: entity.jobAd,
            status: [
                defaultStatus.id
            ],
        });
    }

    let result = await currentRequest.save()
    if (result)
    {
        addNewSuccessMessage('Request added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the request can not be saved!')
        return false
    }
}

export async function updateExistRequest(entity: RequestUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    let currentRequest: any = await getRequestById(entity.id)

    let currentRequestExists = await checkIfUserRequestWithTheSamePropertiesExist(entity.jobAd, entity.user)
    if (currentRequestExists)
    {
        addNewErrorMessage('An request with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.user))
    {
        addNewErrorMessage(`The id ${entity.user} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
        addNewErrorMessage('No user with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.jobAd))
    {
        addNewErrorMessage(`The id ${entity.jobAd} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentJobAd = await getJobAdById(entity.jobAd)
    if (!currentJobAd)
    {
        addNewErrorMessage('No job ad with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.status))
    {
        addNewErrorMessage(`The id ${entity.status} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentStatus: any = await getStatusById(entity.status)
    if (!currentStatus)
    {
        await defaultStatusMaker()
        currentStatus = await getStatusByTitle('Verify Expected')
        return null
    }

    let previousRequestNewStatusList = currentRequest.status.push(currentStatus.id).distinct() // TODO: Check if this
                                                                                               // method works!

    let result = await UserRequest.findByIdAndUpdate(
        entity.id,
        {
            user: entity.user,
            jobAd: entity.jobAd,
            status: previousRequestNewStatusList,
            updateDate: entity.updateDate
        }
    )

    if (result)
    {
        addNewSuccessMessage(`The request updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The request can not be updated!`)
        return false
    }
}

export async function deleteExistRequest(entity: RequestDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getRequestById(entity.id)

    let result = await UserRequest.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The request deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The request can not be deleted!`)
        return false
    }
}

export async function deleteExistRequestByJobAd(jobAdId: string)
{
    emptyMessageList()

    if (idIsNotValid(jobAdId))
    {
        addNewErrorMessage(`The id ${jobAdId} is invalid!`)
        return null
    }
    let result = await UserRequest.deleteMany({
        jobAd: jobAdId
    })
    if (result)
    {
        addNewSuccessMessage(`The jod ad requests deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The jod ad requests can not be deleted!`)
        return false
    }
}

async function checkIfUserRequestWithTheSamePropertiesExist(
    jobAd: string,
    user: string
)
{
    let currentJobAd = await UserRequest.findOne({
        user: user,
        jobAd: jobAd
    })
    return !!currentJobAd;
}