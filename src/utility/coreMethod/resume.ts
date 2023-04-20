import {Resume} from "../../mvc/model/resume";
import {RequestDeleteVm} from "../type/request";
import {idIsNotValid} from "../validator";
import {getUserById} from "./user";
import {ResumeAddVm, ResumeUpdateVm} from "../type/resume";
import {getSalaryById} from "./salary";

export async function getCountOfResume()
{
    let countOfResume = await Resume.count()
    if (countOfResume)
    {
        return countOfResume
    }
    else
    {
        return null
    }
}

export async function getAllResume()
{
    let resumeList = await Resume.find() // TODO: Check if it works!
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
        return null
    }
}

export async function getResumeByFilter(filter: any)
{
    let resumeList = await Resume.find()
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

    if (resumeList)
    {
        return resumeList
    }
    else
    {
        return null
    }
}

export async function getResumeById(id: string)
{
    let currentResume = await Resume.findById(id)
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
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentResume)
    {
        return currentResume
    }
    else
    {
        return null
    }
}

export async function getResumeByIdAndFilter(id: string, filter: any)
{
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
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentResume)
    {
        return currentResume
    }
    else
    {
        return null
    }
}

export async function addNewResume(entity: ResumeAddVm): Promise<null | boolean>
{
    if (
        idIsNotValid(entity.user) ||
        idIsNotValid(entity.expectedSalary)
    )
    {
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
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
        isShowToOthers: entity.isShowToOthers,
    });

    let result = await currentResume.save()
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

export async function updateExistResume(entity: ResumeUpdateVm)
{
    if (
        idIsNotValid(entity.user) ||
        idIsNotValid(entity.expectedSalary)
    )
    {
        return null
    }

    let currentUser = await getUserById(entity.user)
    if (!currentUser)
    {
        return null
    }

    let currentExpectedSalary = await getSalaryById(entity.expectedSalary)
    if (!currentExpectedSalary)
    {
        return null
    }

    let previousResume = await getResumeById(entity.id)
    let resumeSkillLevelList: string[] = [];
    let resumeLanguageLevelList: string[] = [];
    let resumeDegreeList: string[] = [];
    let resumeCareerHistoryList: string[] = [];
    let resumeLinkList: string[] = [];
    let resumeJobTimeList: string[] = [];
    let resumeJobPlaceList: string[] = [];
    let resumeFavoriteJobList: string[] = [];
    if (previousResume)
    {
        resumeSkillLevelList = previousResume['skillLevel'] as string[];
        if (entity.skillLevel && entity.skillLevel.length > 0)
        {
            for (let i = 0; i < entity.skillLevel.length; i++)
            {
                resumeSkillLevelList.push(entity.skillLevel[i])
            }
        }

        resumeLanguageLevelList = previousResume['languageLevel'] as string[];
        if (entity.languageLevel && entity.languageLevel.length > 0)
        {
            for (let i = 0; i < entity.languageLevel.length; i++)
            {
                resumeLanguageLevelList.push(entity.languageLevel[i])
            }
        }

        resumeDegreeList = previousResume['degree'] as string[];
        if (entity.degree && entity.degree.length > 0)
        {
            for (let i = 0; i < entity.degree.length; i++)
            {
                resumeDegreeList.push(entity.degree[i])
            }
        }

        resumeCareerHistoryList = previousResume['careerHistory'] as string[];
        if (entity.careerHistory && entity.careerHistory.length > 0)
        {
            for (let i = 0; i < entity.careerHistory.length; i++)
            {
                resumeCareerHistoryList.push(entity.careerHistory[i])
            }
        }

        resumeLinkList = previousResume['link'] as string[];
        if (entity.link && entity.link.length > 0)
        {
            for (let i = 0; i < entity.link.length; i++)
            {
                resumeLinkList.push(entity.link[i])
            }
        }

        resumeJobTimeList = previousResume['jobTime'] as string[];
        if (entity.jobTime && entity.jobTime.length > 0)
        {
            for (let i = 0; i < entity.jobTime.length; i++)
            {
                resumeJobTimeList.push(entity.jobTime[i])
            }
        }

        resumeJobPlaceList = previousResume['jobPlace'] as string[];
        if (entity.jobPlace && entity.jobPlace.length > 0)
        {
            for (let i = 0; i < entity.jobPlace.length; i++)
            {
                resumeJobPlaceList.push(entity.jobPlace[i])
            }
        }

        resumeFavoriteJobList = previousResume['favoriteJob'] as string[];
        if (entity.favoriteJob && entity.favoriteJob.length > 0)
        {
            for (let i = 0; i < entity.favoriteJob.length; i++)
            {
                resumeFavoriteJobList.push(entity.favoriteJob[i])
            }
        }
    }

    let currentResume = await Resume.findByIdAndUpdate(
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
    return !!currentResume;
}

export async function deleteExistResume(entity: RequestDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Resume.findByIdAndRemove(entity.id)
    return !!result;
}