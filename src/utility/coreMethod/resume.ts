import {Resume} from "../../mvc/model/resume";
import {RequestDeleteVm} from "../type/request";
import {idIsNotValid} from "../validator";
import {getUserById} from "./user";
import {ResumeAddVm, ResumeUpdateVm} from "../type/resume";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {getSkillLevelById} from "./skillLevel";
import {getLanguageLevelById} from "./languageLevel";
import {getDegreeById} from "./degree";
import {getCareerHistoryById} from "./careerHistory";
import {getJobTimeById} from "./jobTime";
import {getJobPlaceById} from "./jobPlace";
import {getJobAdById} from "./jobAd";

export async function getCountOfResume()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfResume = await Resume.count()
    if (countOfResume)
    {
        return countOfResume
    }
    else
    {
        addNewErrorMessage(`We can not get count of address!`)
        return null
    }
}

export async function getAllResume()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let resumeList = await Resume.find()
        .populate({
            path: 'user',
            select: 'name family userName'
        })
        .populate({
            path: 'skillLevel',
            populate: {
                path: 'skill',
                select: 'title'
            }
        })
        .populate({
            path: 'languageLevel',
            populate: {
                path: 'language',
                select: 'title'
            }
        })
        .populate({
            path: 'degree',
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
            path: 'category',
            select: 'title'
        })
        .populate({
            path: 'salary',
            select: 'isAgreed amount'
        })
        .populate({
            path: 'careerHistory',
            select: 'workPlace startWorkingYear endWorkingYear isWorkingYet'
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (resumeList)
    {
        return resumeList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function getResumeById(id: string)
{
    emptyMessageList()

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentResume: any = await Resume.findById(id)
        .populate({
            path: 'user',
            populate: 'name family userName id _id'
        })
        .populate({
            path: 'skillLevel',
            populate: {
                path: 'skill',
                populate: 'title'
            }
        })
        .populate({
            path: 'languageLevel',
            populate: {
                path: 'language',
                populate: 'title'
            }
        })
        .populate({
            path: 'degree',
            populate: 'title'
        })
        .populate({
            path: 'jobTime',
            populate: 'title'
        })
        .populate({
            path: 'jobPlace',
            populate: 'title'
        })
        .populate({
            path: 'category',
            populate: 'title'
        })
        .populate({
            path: 'salary',
            populate: 'isAgreed amount'
        })
        .populate({
            path: 'careerHistory',
            populate: 'workPlace startWorkingYear endWorkingYear isWorkingYet'
        })
        .sort(
            {
                'createDate': -1
            }
        )


    if (
        !currentAuthType.IS_USER_ADMIN &&
        currentResume.user.id != currentAuthType.LOGIN_USER_ID
    )
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (currentResume)
    {
        return currentResume
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getResumeByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let resumeList: any;

    if (filter)
    {
        resumeList = await Resume.find()
            .populate({
                path: 'User',
                populate: 'name family userName'
            })
            .populate({
                path: 'SkillLevel',
                populate: {
                    path: 'Skill',
                    populate: 'title'
                }
            })
            .populate({
                path: 'LanguageLevel',
                populate: {
                    path: 'Language',
                    populate: 'title'
                }
            })
            .populate({
                path: 'Degree',
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
                path: 'Category',
                populate: 'title'
            })
            .populate({
                path: 'Salary',
                populate: 'isAgreed amount'
            })
            .populate({
                path: 'CareerHistory',
                populate: 'workPlace startWorkingYear endWorkingYear isWorkingYet'
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

    if (resumeList)
    {
        return resumeList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of address!`)
        return null
    }
}

export async function getResumeByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No address with id ${id} exists!`)
        return null
    }

    let currentResume: any
    if (filter)
    {
        currentResume = await Resume.findById(id)
            .populate({
                path: 'User',
                populate: 'name family userName'
            })
            .populate({
                path: 'SkillLevel',
                populate: {
                    path: 'Skill',
                    populate: 'title'
                }
            })
            .populate({
                path: 'LanguageLevel',
                populate: {
                    path: 'Language',
                    populate: 'title'
                }
            })
            .populate({
                path: 'Degree',
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
                path: 'Category',
                populate: 'title'
            })
            .populate({
                path: 'Salary',
                populate: 'isAgreed amount'
            })
            .populate({
                path: 'CareerHistory',
                populate: 'workPlace startWorkingYear endWorkingYear isWorkingYet'
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
        currentResume = await getResumeById(id)
    }

    if (currentResume)
    {
        return currentResume
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function addNewResume(entity: ResumeAddVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentResumeExists = await checkIfResumeWithTheSamePropertiesExist(entity.user)
    if (currentResumeExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
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
        addNewErrorMessage('No user with the same id exists! So we can not add any address with the city')
        return null
    }

    entity.skillLevel.map(async sl =>
    {
        if (idIsNotValid(sl))
        {
            addNewErrorMessage(`The id ${sl} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentSkillLevel = await getSkillLevelById(sl)
        if (!currentSkillLevel)
        {
            addNewErrorMessage('No skill level with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    entity.languageLevel.map(async ll =>
    {
        if (idIsNotValid(ll))
        {
            addNewErrorMessage(`The id ${ll} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentLanguageLevel = await getLanguageLevelById(ll)
        if (!currentLanguageLevel)
        {
            addNewErrorMessage('No language level with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    entity.degree.map(async d =>
    {
        if (idIsNotValid(d))
        {
            addNewErrorMessage(`The id ${d} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentDegree = await getDegreeById(d)
        if (!currentDegree)
        {
            addNewErrorMessage('No degree with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    entity.careerHistory.map(async ch =>
    {
        if (idIsNotValid(ch))
        {
            addNewErrorMessage(`The id ${ch} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentCareerHistory = await getCareerHistoryById(ch)
        if (!currentCareerHistory)
        {
            addNewErrorMessage('No career history with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    entity.jobTime.map(async jt =>
    {
        if (idIsNotValid(jt))
        {
            addNewErrorMessage(`The id ${jt} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentJobTime = await getJobTimeById(jt)
        if (!currentJobTime)
        {
            addNewErrorMessage('No job time with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    entity.jobPlace.map(async jp =>
    {
        if (idIsNotValid(jp))
        {
            addNewErrorMessage(`The id ${jp} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentJobPlace = await getJobPlaceById(jp)
        if (!currentJobPlace)
        {
            addNewErrorMessage('No job place with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    entity.favoriteJob.map(async fj =>
    {
        if (idIsNotValid(fj))
        {
            addNewErrorMessage(`The id ${fj} is invalid and can not be belonged to any city!`)
            return null
        }
        let currentFavoriteJob = await getJobAdById(fj)
        if (!currentFavoriteJob)
        {
            addNewErrorMessage('No job ad with the same id exists! So we can not add any address with the city')
            return null
        }
    })

    if (idIsNotValid(entity.expectedSalary))
    {
        addNewErrorMessage(`The id ${entity.expectedSalary} is invalid and can not be belonged to any city!`)
        return null
    }
    let currentExpectedSalary = await getUserById(entity.expectedSalary)
    if (!currentExpectedSalary)
    {
        addNewErrorMessage('No expected salary with the same id exists! So we can not add any address with the city')
        return null
    }

    let currentResume = new Resume({
        user: entity.user,
        skillLevel: entity.skillLevel,
        languageLevel: entity.languageLevel,
        degree: entity.degree,
        careerHistory: entity.careerHistory,
        link: entity.link,
        jobTime: entity.jobTime,
        jobPlace: entity.jobPlace,
        favoriteJob: entity.favoriteJob,
        expectedSalary: entity.expectedSalary,
        isShowToOthers: entity.isShowToOthers
    });

    let result = await currentResume.save()
    if (result)
    {
        addNewSuccessMessage('Address added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the address can not be saved!')
        return false
    }
}

export async function updateExistResume(entity: ResumeUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    let currentResumeExists = await checkIfResumeWithTheSamePropertiesExist(entity.user)
    if (currentResumeExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    let previousResume: any = await getResumeById(entity.id)
    if (!previousResume)
    {
        addNewErrorMessage(`No resume with ${entity.id} exists!`)
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
        addNewErrorMessage('No user with the same id exists! So we can not add any address with the city')
        return null
    }

    let resumeSkillLevelList = previousResume.skillLevel
    if (entity.skillLevel && entity.skillLevel.length > 0)
    {
        entity.skillLevel.map(async cm =>
        {
            if (idIsNotValid(cm))
            {
                addNewErrorMessage(`The id ${cm} is invalid and can not be belonged to any city!`)
                return null
            }
            let currentSkillLevel = await getSkillLevelById(cm)
            if (!currentSkillLevel)
            {
                addNewErrorMessage('No skill level with the same id exists! So we can not add any address with the city')
                return null
            }

            resumeSkillLevelList.push(cm)
        })
    }

    let resumeLanguageLevelList = previousResume.languageLevel
    if (entity.languageLevel && entity.languageLevel.length > 0)
    {
        entity.languageLevel.map(cm =>
        {
            resumeLanguageLevelList.push(cm)
        })
    }

    let resumeDegreeList = previousResume.degree
    if (entity.degree && entity.degree.length > 0)
    {
        entity.degree.map(async cm =>
        {
            if (idIsNotValid(cm))
            {
                addNewErrorMessage(`The id ${cm} is invalid and can not be belonged to any city!`)
                return null
            }
            let currentDegree = await getDegreeById(cm)
            if (!currentDegree)
            {
                addNewErrorMessage('No degree with the same id exists! So we can not add any address with the city')
                return null
            }

            resumeDegreeList.push(cm)
        })
    }

    let resumeCareerHistoryList = previousResume.careerHistory
    if (entity.careerHistory && entity.careerHistory.length > 0)
    {
        entity.careerHistory.map(async cm =>
        {
            if (idIsNotValid(cm))
            {
                addNewErrorMessage(`The id ${cm} is invalid and can not be belonged to any city!`)
                return null
            }
            let currentCareerHistory = await getCareerHistoryById(cm)
            if (!currentCareerHistory)
            {
                addNewErrorMessage('No career history with the same id exists! So we can not add any address with the city')
                return null
            }

            resumeCareerHistoryList.push(cm)
        })
    }

    let resumeLinkList = previousResume.link
    if (entity.link && entity.link.length > 0)
    {
        entity.link.map(cm =>
        {
            resumeLinkList.push(cm)
        })
    }

    let resumeJobTimeList = previousResume.jobTime
    if (entity.jobTime && entity.jobTime.length > 0)
    {
        entity.jobTime.map(async cm =>
        {
            if (idIsNotValid(cm))
            {
                addNewErrorMessage(`The id ${cm} is invalid and can not be belonged to any city!`)
                return null
            }
            let currentJobTime = await getJobTimeById(cm)
            if (!currentJobTime)
            {
                addNewErrorMessage('No job time with the same id exists! So we can not add any address with the city')
                return null
            }

            resumeJobTimeList.push(cm)
        })
    }

    let resumeJobPlaceList = previousResume.jobPlace
    if (entity.jobPlace && entity.jobPlace.length > 0)
    {
        entity.jobPlace.map(async cm =>
        {
            if (idIsNotValid(cm))
            {
                addNewErrorMessage(`The id ${cm} is invalid and can not be belonged to any city!`)
                return null
            }
            let currentJobPlace = await getJobPlaceById(cm)
            if (!currentJobPlace)
            {
                addNewErrorMessage('No job place with the same id exists! So we can not add any address with the city')
                return null
            }

            resumeJobPlaceList.push(cm)
        })
    }

    let resumeFavoriteJobList = previousResume.favoriteJob
    if (entity.favoriteJob && entity.favoriteJob.length > 0)
    {
        entity.favoriteJob.map(async cm =>
        {
            if (idIsNotValid(cm))
            {
                addNewErrorMessage(`The id ${cm} is invalid and can not be belonged to any city!`)
                return null
            }
            let currentFavoriteJob = await getJobAdById(cm)
            if (!currentFavoriteJob)
            {
                addNewErrorMessage('No job ad with the same id exists! So we can not add any address with the city')
                return null
            }

            resumeFavoriteJobList.push(cm)
        })
    }

    let result = await Resume.findByIdAndUpdate(
        entity.id,
        {
            user: entity.user,
            skillLevel: resumeSkillLevelList,
            languageLevel: resumeLanguageLevelList,
            degree: resumeDegreeList,
            careerHistory: resumeCareerHistoryList,
            link: resumeLinkList,
            jobTime: resumeJobTimeList,
            jobPlace: resumeJobPlaceList,
            favoriteJob: resumeFavoriteJobList,
            expectedSalary: entity.expectedSalary,
            isShowToOthers: entity.isShowToOthers,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The address updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be updated!`)
        return false
    }
}

export async function deleteExistResume(entity: RequestDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getResumeById(entity.id)

    let result = await Resume.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The address deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be deleted!`)
        return false
    }
}

async function checkIfResumeWithTheSamePropertiesExist(
    user: string
)
{
    let currentResume = await Resume.findOne({
        user: user
    })
    return !!currentResume;
}