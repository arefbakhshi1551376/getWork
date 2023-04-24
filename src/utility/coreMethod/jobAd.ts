import {JobAd} from "../../mvc/model/jobAd";
import {UserDeleteVm} from "../type/user";
import {idIsNotValid} from "../validator";
import {getGenderById} from "./gender";
import {JobAdAddVm, JobAdUpdateVm} from "../type/jobAd";
import {getJobTimeById} from "./jobTime";
import {getJobPlaceById} from "./jobPlace";
import {getSeniorityLevelById} from "./seniorityLevel";
import {getIntroductionById} from "./introduction";
import {getCompanyById} from "./company";
import {getSalaryById} from "./salary";

export async function getCountOfJobAd()
{
    let countOfJobAd = await JobAd.count()
    if (countOfJobAd)
    {
        return countOfJobAd
    }
    else
    {
        return null
    }
}

export async function getAllJobAd()
{
    let jobAdList = await JobAd.find() // TODO: Check if it works!
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'company',
            populate: [
                {
                    path: 'introduction',
                    select: 'title description'
                },
                {
                    path: 'address',
                    populate: {
                        path: 'city',
                        select: 'title',
                        populate: {
                            path: 'state',
                            select: 'title',
                            populate: {
                                path: 'country',
                                select: 'title'
                            }
                        }
                    }
                },
            ]
        })
        .populate({
            path: 'salary',
            select: 'isAgreed amount'
        })
        .populate({
            path: 'gender',
            select: 'title'
        })
        .populate({
            path: 'jobTime',
            select: 'title'
        })
        .populate({
            path: 'jobPlace',
            select: 'title'
        })
        .populate({
            path: 'seniorityLevel',
            select: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (jobAdList)
    {
        return jobAdList
    }
    else
    {
        return null
    }
}

export async function getJobAdByFilter(filter: any)
{
    let jobAdList = await JobAd.find()
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'company',
            populate: [
                {
                    path: 'introduction',
                    select: 'title description'
                },
                {
                    path: 'address',
                    populate: {
                        path: 'city',
                        select: 'title',
                        populate: {
                            path: 'state',
                            select: 'title',
                            populate: {
                                path: 'country',
                                select: 'title'
                            }
                        }
                    }
                },
            ]
        })
        .populate({
            path: 'salary',
            select: 'isAgreed amount'
        })
        .populate({
            path: 'gender',
            select: 'title'
        })
        .populate({
            path: 'jobTime',
            select: 'title'
        })
        .populate({
            path: 'jobPlace',
            select: 'title'
        })
        .populate({
            path: 'seniorityLevel',
            select: 'title'
        })
        .select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (jobAdList)
    {
        return jobAdList
    }
    else
    {
        return null
    }
}

export async function getJobAdById(id: string)
{
    let currentJobAd = await JobAd.findById(id)
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'company',
            populate: [
                {
                    path: 'introduction',
                    select: 'title description'
                },
                {
                    path: 'address',
                    populate: {
                        path: 'city',
                        select: 'title',
                        populate: {
                            path: 'state',
                            select: 'title',
                            populate: {
                                path: 'country',
                                select: 'title'
                            }
                        }
                    }
                },
            ]
        })
        .populate({
            path: 'salary',
            select: 'isAgreed amount'
        })
        .populate({
            path: 'gender',
            select: 'title'
        })
        .populate({
            path: 'jobTime',
            select: 'title'
        })
        .populate({
            path: 'jobPlace',
            select: 'title'
        })
        .populate({
            path: 'seniorityLevel',
            select: 'title'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentJobAd)
    {
        return currentJobAd
    }
    else
    {
        return null
    }
}

export async function getJobAdByIdAndFilter(id: string, filter: any)
{
    let currentJobAd: any
    if (filter)
    {
        currentJobAd = await JobAd.findById(id)
            .populate({
                path: 'introduction',
                select: 'title description'
            })
            .populate({
                path: 'company',
                populate: [
                    {
                        path: 'introduction',
                        select: 'title description'
                    },
                    {
                        path: 'address',
                        populate: {
                            path: 'city',
                            select: 'title',
                            populate: {
                                path: 'state',
                                select: 'title',
                                populate: {
                                    path: 'country',
                                    select: 'title'
                                }
                            }
                        }
                    },
                ]
            })
            .populate({
                path: 'salary',
                select: 'isAgreed amount'
            })
            .populate({
                path: 'gender',
                select: 'title'
            })
            .populate({
                path: 'jobTime',
                select: 'title'
            })
            .populate({
                path: 'jobPlace',
                select: 'title'
            })
            .populate({
                path: 'seniorityLevel',
                select: 'title'
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
        currentJobAd = await getJobAdById(id)
    }

    if (currentJobAd)
    {
        return currentJobAd
    }
    else
    {
        return null
    }
}

// export async function addNewRequestToJobAd(entity: JobAdAddNewRequestVm)
// {
//     if (
//         idIsNotValid(entity.id) ||
//         idIsNotValid(entity.request)
//     )
//     {
//         return null
//     }
//
//     let currentJobAdRequestList = await getRequestIdListByJobAdId(entity.id) as string[]
//     let finalCurrentJobAdRequestList: string[] = []
//     finalCurrentJobAdRequestList.push(entity.request)
//     if (currentJobAdRequestList && currentJobAdRequestList.length > 0)
//     {
//         for (let i = 0; i < currentJobAdRequestList.length; i++)
//         {
//             finalCurrentJobAdRequestList.push(currentJobAdRequestList[i])
//         }
//     }
//
//     let currentJobAd = await JobAd.findByIdAndUpdate(
//         entity.id,
//         {
//             request: finalCurrentJobAdRequestList,
//             updateDate: entity.updateDate
//         }
//     )
//
//     return !!currentJobAd;
// }

export async function addNewJobAd(entity: JobAdAddVm): Promise<null | boolean>
{
    if (
        idIsNotValid(entity.introduction) ||
        idIsNotValid(entity.company) ||
        idIsNotValid(entity.salary)
    )
    {
        console.log('Introduction id or company id or salary id is wrong!')
        return null
    }

    let currentIntroduction = await getIntroductionById(entity.introduction)
    if (!currentIntroduction)
    {
        console.log('Introduction is not exists!')
        return null
    }

    let currentCompany = await getCompanyById(entity.company)
    if (!currentCompany)
    {
        console.log('Company is not exists!')
        return null
    }

    let currentSalary = await getSalaryById(entity.salary)
    if (!currentSalary)
    {
        console.log('Salary is not exists!')
        return null
    }


    for (let i = 0; i < entity.gender.length; i++)
    {
        if (
            idIsNotValid(entity.gender[i])
        )
        {
            console.log('Gender id is wrong!')
            return null
        }
        else
        {
            let currentGender = await getGenderById(entity.gender[i])
            if (!currentGender)
            {
                console.log('Gender is not exists!')
                return null
            }
        }
    }


    for (let i = 0; i < entity.jobTime.length; i++)
    {
        if (
            idIsNotValid(entity.jobTime[i])
        )
        {
            console.log('Job time id is wrong!')
            return null
        }
        else
        {
            let currentJobTime = await getJobTimeById(entity.jobTime[i])
            if (!currentJobTime)
            {
                console.log('Job time is not exists!')
                return null
            }
        }
    }

    for (let i = 0; i < entity.jobPlace.length; i++)
    {
        if (
            idIsNotValid(entity.jobPlace[i])
        )
        {
            console.log('Job place id is wrong!')
            return null
        }
        else
        {
            let currentJobPlace = await getJobPlaceById(entity.jobPlace[i])
            if (!currentJobPlace)
            {
                console.log('Job time is not exists!')
                return null
            }
        }
    }

    for (let i = 0; i < entity.seniorityLevel.length; i++)
    {
        if (
            idIsNotValid(entity.seniorityLevel[i])
        )
        {
            console.log('Seniority level id is wrong!')
            return null
        }
        else
        {
            let currentSeniorityLevel = await getSeniorityLevelById(entity.seniorityLevel[i])
            if (!currentSeniorityLevel)
            {
                console.log('Seniority level is not exists!')
                return null
            }
        }
    }

    let nowDate = new Date()
    let sixtyDaysLater = nowDate.setDate(nowDate.getDate() + 60)
    console.log(`Expire date is ${sixtyDaysLater}`)

    let currentJobAd = new JobAd({
        introduction: entity.introduction,
        company: entity.company,
        neededUser: entity.neededUser,
        isWithInsurance: entity.isWithInsurance,
        salary: entity.salary,
        gender: entity.gender,
        jobTime: entity.jobTime,
        jobPlace: entity.jobPlace,
        seniorityLevel: entity.seniorityLevel,
        requiredWorkExperience: entity.requiredWorkExperience,
        isEnable: entity.isEnable,
        expireDate: sixtyDaysLater,
    })
    let result = await currentJobAd.save()
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

export async function updateExistJobAd(entity: JobAdUpdateVm)
{
    if (
        idIsNotValid(entity.introduction) ||
        idIsNotValid(entity.company) ||
        idIsNotValid(entity.salary)
    )
    {
        return null
    }

    let currentIntroduction = await getIntroductionById(entity.introduction)
    if (!currentIntroduction)
    {
        return null
    }

    let currentCompany = await getCompanyById(entity.company)
    if (!currentCompany)
    {
        return null
    }

    let currentSalary = await getSalaryById(entity.salary)
    if (!currentSalary)
    {
        return null
    }

    for (let i = 0; i < entity.gender.length; i++)
    {
        if (
            idIsNotValid(entity.gender[i])
        )
        {
            return null
        }
        else
        {
            let currentGender = await getGenderById(entity.gender[i])
            if (!currentGender)
            {
                return null
            }
        }
    }


    for (let i = 0; i < entity.jobTime.length; i++)
    {
        if (
            idIsNotValid(entity.jobTime[i])
        )
        {
            return null
        }
        else
        {
            let currentJobTime = await getJobTimeById(entity.jobTime[i])
            if (!currentJobTime)
            {
                return null
            }
        }
    }

    for (let i = 0; i < entity.jobPlace.length; i++)
    {
        if (
            idIsNotValid(entity.jobPlace[i])
        )
        {
            return null
        }
        else
        {
            let currentJobPlace = await getJobPlaceById(entity.jobPlace[i])
            if (!currentJobPlace)
            {
                return null
            }
        }
    }

    for (let i = 0; i < entity.seniorityLevel.length; i++)
    {
        if (
            idIsNotValid(entity.seniorityLevel[i])
        )
        {
            return null
        }
        else
        {
            let currentSeniorityLevel = await getSeniorityLevelById(entity.seniorityLevel[i])
            if (!currentSeniorityLevel)
            {
                return null
            }
        }
    }

    let currentJobAd = await JobAd.findByIdAndUpdate(
        entity.id,
        {
            introduction: entity.introduction,
            company: entity.company,
            neededUser: entity.neededUser,
            isWithInsurance: entity.isWithInsurance,
            salary: entity.salary,
            gender: entity.gender,
            jobTime: entity.jobTime,
            jobPlace: entity.jobPlace,
            seniorityLevel: entity.seniorityLevel,
            requiredWorkExperience: entity.requiredWorkExperience,
            isEnable: entity.isEnable,
            updateDate: entity.updateDate
        }
    )
    return !!currentJobAd;
}

export async function deleteExistJobAd(entity: UserDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await JobAd.findByIdAndRemove(entity.id)
    return !!result;
    // let deleteExistRequestByJobAdResult = await deleteExistRequestByJobAd(entity.id)
    // if (deleteExistRequestByJobAdResult)
    // {
    //     let result = await JobAd.findByIdAndRemove(entity.id)
    //     return !!result;
    // }
    // else
    // {
    //     return null
    // }
}
