import {JobPlace} from "../../mvc/model/jobPlace";
import {JobPlaceAddVm, JobPlaceDeleteVm, JobPlaceUpdateVm} from "../type/jobPlace";
import {idIsNotValid} from "../validator";

export async function getCountOfJobPlace()
{
    let countOfJobPlace = await JobPlace.count()
    if (countOfJobPlace)
    {
        return countOfJobPlace
    }
    else
    {
        return null
    }
}

export async function getAllJobPlace()
{
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
        return null
    }
}

export async function getJobPlaceByFilter(filter: any)
{
    let jobPlaceList = await JobPlace.find().select(`${filter}`)
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
        return null
    }
}

export async function getJobPlaceById(id: string)
{
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
        return null
    }
}

export async function addNewJobPlace(entity: JobPlaceAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfJobPlaceWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentJobPlace = new JobPlace({
            title: entity.title
        })
        let result = await currentJobPlace.save()
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

export async function updateExistJobPlace(entity: JobPlaceUpdateVm)
{
    let titleExist = await checkIfJobPlaceWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentJobPlace = await JobPlace.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentJobPlace;
    }
    else
    {
        return false
    }
}

export async function deleteExistJobPlace(entity: JobPlaceDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await JobPlace.findByIdAndRemove(entity.id)
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

async function checkIfJobPlaceWithTheSameTitleExist(title: string)
{
    let currentJobPlace = await JobPlace.findOne({
        title: title
    })
    return !!currentJobPlace;
}