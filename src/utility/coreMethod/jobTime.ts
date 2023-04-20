import {JobTime} from "../../mvc/model/jobTime";
import {JobTimeAddVm, JobTimeDeleteVm, JobTimeUpdateVm} from "../type/jobTime";
import {idIsNotValid} from "../validator";

export async function getCountOfJobTime()
{
    let countOfJobTime = await JobTime.count()
    if (countOfJobTime)
    {
        return countOfJobTime
    }
    else
    {
        return null
    }
}

export async function getAllJobTime()
{
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
        return null
    }
}

export async function getJobTimeByFilter(filter: any)
{
    let jobTimeList = await JobTime.find().select(`${filter}`)
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
        return null
    }
}

export async function getJobTimeById(id: string)
{
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
        return null
    }
}

export async function addNewJobTime(entity: JobTimeAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfJobTimeWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentJobTime = new JobTime({
            title: entity.title
        })
        let result = await currentJobTime.save()
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

export async function updateExistJobTime(entity: JobTimeUpdateVm)
{
    let titleExist = await checkIfJobTimeWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentGender = await JobTime.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentGender;
    }
    else
    {
        return false
    }
}

export async function deleteExistJobTime(entity: JobTimeDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await JobTime.findByIdAndRemove(entity.id)
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

async function checkIfJobTimeWithTheSameTitleExist(title: string)
{
    let currentJobTime = await JobTime.findOne({
        title: title
    })
    return !!currentJobTime;
}