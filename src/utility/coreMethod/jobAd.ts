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
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfJobAd()
{
    emptyMessageList()
    let countOfJobAd = await JobAd.count()
    if (countOfJobAd)
    {
        return countOfJobAd
    }
    else
    {
        addNewErrorMessage(`We can not get count of job ad!`)
        return null
    }
}

export async function getAllJobAd()
{
    emptyMessageList()
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
        addNewErrorMessage(`We can not get list of job ad!`)
        return null
    }
}

export async function getJobAdById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get count of job ad!`)
        return null
    }
}

export async function getJobAdByFilter(filter: any)
{
    emptyMessageList()
    let jobAdList: any
    if (filter)
    {
        jobAdList = await JobAd.find()
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
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter a filter!`)
        return null
    }

    if (jobAdList)
    {
        return jobAdList
    }
    else
    {
        addNewErrorMessage(`We can not get list of job ad!`)
        return null
    }
}

export async function getJobAdByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No job ad with id ${id} exists!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current job ad!`)
        return null
    }
}

export async function addNewJobAd(entity: JobAdAddVm): Promise<null | boolean>
{
    emptyMessageList()

    if (idIsNotValid(entity.introduction))
    {
        addNewErrorMessage(`The id ${entity.introduction} is invalid!`)
        return null
    }

    let currentIntroduction = await getIntroductionById(entity.introduction)
    if (!currentIntroduction)
    {
        addNewErrorMessage('No introduction with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.company))
    {
        addNewErrorMessage(`The id ${entity.company} is invalid!`)
        return null
    }

    let currentCompany = await getCompanyById(entity.company)
    if (!currentCompany)
    {
        addNewErrorMessage('No company with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.salary))
    {
        addNewErrorMessage(`The id ${entity.salary} is invalid!`)
        return null
    }

    let currentSalary = await getSalaryById(entity.salary)
    if (!currentSalary)
    {
        addNewErrorMessage('No salary with the same id exists!')
        return null
    }

    entity.gender.map(async g =>
    {
        if (idIsNotValid(g))
        {
            addNewErrorMessage(`The id ${g} is invalid!`)
            return null
        }

        let currentGender = await getGenderById(g)
        if (!currentGender)
        {
            addNewErrorMessage('No gender with the same id exists!')
            return null
        }
    })

    entity.jobTime.map(async jT =>
    {
        if (idIsNotValid(jT))
        {
            addNewErrorMessage(`The id ${jT} is invalid!`)
            return null
        }

        let currentJobTime = await getJobTimeById(jT)
        if (!currentJobTime)
        {
            addNewErrorMessage('No job time with the same id exists!')
            return null
        }
    })

    entity.jobPlace.map(async jP =>
    {
        if (idIsNotValid(jP))
        {
            addNewErrorMessage(`The id ${jP} is invalid!`)
            return null
        }

        let currentJobPlace = await getJobPlaceById(jP)
        if (!currentJobPlace)
        {
            addNewErrorMessage('No job place with the same id exists!')
            return null
        }
    })

    entity.seniorityLevel.map(async sL =>
    {
        if (idIsNotValid(sL))
        {
            addNewErrorMessage(`The id ${sL} is invalid!`)
            return null
        }

        let currentSeniorityLevel = await getSeniorityLevelById(sL)
        if (!currentSeniorityLevel)
        {
            addNewErrorMessage('No seniority level with the same id exists!')
            return null
        }
    })

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
        creator: entity.creator
    })
    let result = await currentJobAd.save()
    if (result)
    {
        addNewSuccessMessage('Job Ad added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the job ad can not be saved!')
        return false
    }
}

export async function updateExistJobAd(entity: JobAdUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    let currentJobAd: any = await getJobAdById(entity.id)

    if (
        !currentAuthType.IS_USER_ADMIN &&
        currentJobAd.company.creator.id != currentAuthType.LOGIN_USER_ID &&
        currentJobAd.creator.id != currentAuthType.LOGIN_USER_ID
    )
    {
        addNewErrorMessage('You can not access this part!')
        return null
    }

    if (idIsNotValid(entity.introduction))
    {
        addNewErrorMessage(`The id ${entity.introduction} is invalid!`)
        return null
    }

    let currentIntroduction = await getIntroductionById(entity.introduction)
    if (!currentIntroduction)
    {
        addNewErrorMessage('No introduction with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.company))
    {
        addNewErrorMessage(`The id ${entity.company} is invalid!`)
        return null
    }

    let currentCompany = await getCompanyById(entity.company)
    if (!currentCompany)
    {
        addNewErrorMessage('No company with the same id exists!')
        return null
    }

    if (idIsNotValid(entity.salary))
    {
        addNewErrorMessage(`The id ${entity.salary} is invalid!`)
        return null
    }

    let currentSalary = await getSalaryById(entity.salary)
    if (!currentSalary)
    {
        addNewErrorMessage('No salary with the same id exists!')
        return null
    }

    entity.gender.map(async g =>
    {
        if (idIsNotValid(g))
        {
            addNewErrorMessage(`The id ${g} is invalid!`)
            return null
        }

        let currentGender = await getGenderById(g)
        if (!currentGender)
        {
            addNewErrorMessage('No gender with the same id exists!')
            return null
        }
    })

    entity.jobTime.map(async jT =>
    {
        if (idIsNotValid(jT))
        {
            addNewErrorMessage(`The id ${jT} is invalid!`)
            return null
        }

        let currentJobTime = await getJobTimeById(jT)
        if (!currentJobTime)
        {
            addNewErrorMessage('No job time with the same id exists!')
            return null
        }
    })

    entity.jobPlace.map(async jP =>
    {
        if (idIsNotValid(jP))
        {
            addNewErrorMessage(`The id ${jP} is invalid!`)
            return null
        }

        let currentJobPlace = await getJobPlaceById(jP)
        if (!currentJobPlace)
        {
            addNewErrorMessage('No job place with the same id exists!')
            return null
        }
    })

    entity.seniorityLevel.map(async sL =>
    {
        if (idIsNotValid(sL))
        {
            addNewErrorMessage(`The id ${sL} is invalid!`)
            return null
        }

        let currentSeniorityLevel = await getSeniorityLevelById(sL)
        if (!currentSeniorityLevel)
        {
            addNewErrorMessage('No seniority level with the same id exists!')
            return null
        }
    })

    let result = await JobAd.findByIdAndUpdate(
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
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage('Job Ad updated successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the job ad can not be updated!')
        return false
    }
}

export async function deleteExistJobAd(entity: UserDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    let currentJobAd: any = await getJobAdById(entity.id)

    if (
        !currentAuthType.IS_USER_ADMIN &&
        currentJobAd.company.creator.id != currentAuthType.LOGIN_USER_ID &&
        currentJobAd.creator.id != currentAuthType.LOGIN_USER_ID
    )
    {
        addNewErrorMessage('You can not access this part!')
        return null
    }

    let result = await JobAd.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The job ad deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The job ad can not be deleted!`)
        return false
    }
}
