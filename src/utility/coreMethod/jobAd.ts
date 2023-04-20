import {JobAd} from "../../mvc/model/jobAd";
import {UserDeleteVm} from "../type/user";
import {idIsNotValid} from "../validator";
import {getGenderById} from "./gender";
import {User} from "../../mvc/model/user";
import {JobAdAddVm, JobAdUpdateVm} from "../type/jobAd";
import {getJobTimeById} from "./jobTime";
import {getJobPlaceById} from "./jobPlace";
import {getSeniorityLevelById} from "./seniorityLevel";
import {Introduction} from "../type/introduction";
import {Company} from "../type/company";
import {Salary} from "../type/salary";
import {Gender} from "../type/gender";
import {JobTime} from "../type/jobTime";
import {JobPlace} from "../type/jobPlace";
import {SeniorityLevel} from "../type/seniorityLevel";
import {Request, RequestDeleteVm} from "../type/request";
import {getIntroductionById} from "./introduction";
import {getCompanyById} from "./company";
import {getSalaryById} from "./salary";
import {deleteExistRequest, getRequestByJobAdId} from "./request";


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
            path: 'Introduction',
            populate: 'title description'
        })
        .populate({
            path: 'Company',
            populate: [
                {
                    path: 'Introduction',
                    populate: 'title description'
                },
                {
                    path: 'Address',
                    populate: {
                        path: 'City',
                        populate: {
                            path: 'State',
                            populate: {
                                path: 'Country',
                                populate: 'title'
                            }
                        }
                    }
                },
            ]
        })
        .populate({
            path: 'Salary',
            populate: 'isAgreed amount'
        })
        .populate({
            path: 'Gender',
            populate: 'title'
        })
        .populate({
            path: 'JobTime',
            populate: 'title'
        })
        .populate({
            path: 'JobPlace',
            populate: 'title'
        })
        .populate({
            path: 'SeniorityLevel',
            populate: 'title'
        })
        .populate({
            path: 'Request',
            populate: [
                {
                    path: 'User',
                    populate: 'name family userName'
                },
                {
                    path: 'Status',
                    populate: 'title'
                },
            ]
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
            path: 'Introduction',
            populate: 'title description'
        })
        .populate({
            path: 'Company',
            populate: [
                {
                    path: 'Introduction',
                    populate: 'title description'
                },
                {
                    path: 'Address',
                    populate: {
                        path: 'City',
                        populate: {
                            path: 'State',
                            populate: {
                                path: 'Country',
                                populate: 'title'
                            }
                        }
                    }
                },
            ]
        })
        .populate({
            path: 'Salary',
            populate: 'isAgreed amount'
        })
        .populate({
            path: 'Gender',
            populate: 'title'
        })
        .populate({
            path: 'JobTime',
            populate: 'title'
        })
        .populate({
            path: 'JobPlace',
            populate: 'title'
        })
        .populate({
            path: 'SeniorityLevel',
            populate: 'title'
        })
        .populate({
            path: 'Request',
            populate: [
                {
                    path: 'User',
                    populate: 'name family userName'
                },
                {
                    path: 'Status',
                    populate: 'title'
                },
            ]
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
            path: 'Introduction',
            populate: 'title description'
        })
        .populate({
            path: 'Company',
            populate: [
                {
                    path: 'Introduction',
                    populate: 'title description'
                },
                {
                    path: 'Address',
                    populate: {
                        path: 'City',
                        populate: {
                            path: 'State',
                            populate: {
                                path: 'Country',
                                populate: 'title'
                            }
                        }
                    }
                },
            ]
        })
        .populate({
            path: 'Salary',
            populate: 'isAgreed amount'
        })
        .populate({
            path: 'Gender',
            populate: 'title'
        })
        .populate({
            path: 'JobTime',
            populate: 'title'
        })
        .populate({
            path: 'JobPlace',
            populate: 'title'
        })
        .populate({
            path: 'SeniorityLevel',
            populate: 'title'
        })
        .populate({
            path: 'Request',
            populate: [
                {
                    path: 'User',
                    populate: 'name family userName'
                },
                {
                    path: 'Status',
                    populate: 'title'
                },
            ]
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
                path: 'Introduction',
                populate: 'title description'
            })
            .populate({
                path: 'Company',
                populate: [
                    {
                        path: 'Introduction',
                        populate: 'title description'
                    },
                    {
                        path: 'Address',
                        populate: {
                            path: 'City',
                            populate: {
                                path: 'State',
                                populate: {
                                    path: 'Country',
                                    populate: 'title'
                                }
                            }
                        }
                    },
                ]
            })
            .populate({
                path: 'Salary',
                populate: 'isAgreed amount'
            })
            .populate({
                path: 'Gender',
                populate: 'title'
            })
            .populate({
                path: 'JobTime',
                populate: 'title'
            })
            .populate({
                path: 'JobPlace',
                populate: 'title'
            })
            .populate({
                path: 'SeniorityLevel',
                populate: 'title'
            })
            .populate({
                path: 'Request',
                populate: [
                    {
                        path: 'User',
                        populate: 'name family userName'
                    },
                    {
                        path: 'Status',
                        populate: 'title'
                    },
                ]
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
        currentJobAd = await JobAd.findById(id)
            .populate({
                path: 'Introduction',
                populate: 'title description'
            })
            .populate({
                path: 'Company',
                populate: [
                    {
                        path: 'Introduction',
                        populate: 'title description'
                    },
                    {
                        path: 'Address',
                        populate: {
                            path: 'City',
                            populate: {
                                path: 'State',
                                populate: {
                                    path: 'Country',
                                    populate: 'title'
                                }
                            }
                        }
                    },
                ]
            })
            .populate({
                path: 'Salary',
                populate: 'isAgreed amount'
            })
            .populate({
                path: 'Gender',
                populate: 'title'
            })
            .populate({
                path: 'JobTime',
                populate: 'title'
            })
            .populate({
                path: 'JobPlace',
                populate: 'title'
            })
            .populate({
                path: 'SeniorityLevel',
                populate: 'title'
            })
            .populate({
                path: 'Request',
                populate: [
                    {
                        path: 'User',
                        populate: 'name family userName'
                    },
                    {
                        path: 'Status',
                        populate: 'title'
                    },
                ]
            })
            .sort(
                {
                    'createDate': -1
                }
            )
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

export async function addNewJobAd(entity: JobAdAddVm): Promise<null | boolean>
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

    let nowDate = new Date()
    let sixtyDaysLater = nowDate.setDate(nowDate.getDate() + 60)

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
    let currentJobAdRequestIdList = await getRequestByJobAdId(entity.id) as string[]
    if (currentJobAdRequestIdList)
    {
        for (let i = 0; i < currentJobAdRequestIdList.length; i++)
        {
            let currentRequestDeleteVm: RequestDeleteVm = {
                id: currentJobAdRequestIdList[i]
            }
            await deleteExistRequest(currentRequestDeleteVm)
        }
    }
    return !!result;
}
