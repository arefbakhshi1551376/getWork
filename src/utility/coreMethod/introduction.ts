import {Introduction} from "../../mvc/model/introduction";
import {IntroductionAddVm, IntroductionDeleteVm, IntroductionUpdateVm} from "../type/introduction";
import {idIsNotValid} from "../validator";
import {currentErrorList, currentUserData} from "../constant";

export async function getCountOfIntroduction()
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfIntroduction = await Introduction.count()
    if (countOfIntroduction)
    {
        return countOfIntroduction
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t get count of introductions! Some thing went wrong')
        return null
    }
}

export async function getAllIntroduction()
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionList = await Introduction.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (introductionList)
    {
        return introductionList
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t get list of introductions! Some thing went wrong')
        return null
    }
}

export async function getIntroductionByFilter(filter: any)
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionList = await Introduction.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (introductionList)
    {
        return introductionList
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t get list of introductions! Some thing went wrong')
        return null
    }
}

export async function getIntroductionById(id: string)
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let currentIntroduction = await Introduction.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentIntroduction)
    {
        return currentIntroduction
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function getIntroductionByIdAndFilter(id: string, filter: any)
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let currentIntroduction: any
    if (filter)
    {
        currentIntroduction = await Introduction.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentIntroduction = await getIntroductionById(id)
    }

    if (currentIntroduction)
    {
        return currentIntroduction
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function addNewIntroduction(entity: IntroductionAddVm): Promise<null | boolean>
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionExists = await checkIfIntroductionWithTheSamePropertiesExist(entity.title, entity.description)
    if (introductionExists)
    {
        currentErrorList.MY_ERROR_LIST.push('An introduction with the same properties exists!')
        return null
    }

    let currentIntroduction = new Introduction({
        title: entity.title,
        description: entity.description
    })
    let result = await currentIntroduction.save()
    if (result)
    {
        return true
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t save this introduction! Some thing went wrong')
        return false
    }
}

export async function updateExistIntroduction(entity: IntroductionUpdateVm)
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionExists = await checkIfIntroductionWithTheSamePropertiesExist(entity.title, entity.description)
    if (introductionExists)
    {
        currentErrorList.MY_ERROR_LIST.push('An introduction with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        currentErrorList.MY_ERROR_LIST.push(`Id ${entity.id} is not valid!`)
        return null
    }
    let currentIntroduction = await getIntroductionById(entity.id)
    if (!currentIntroduction)
    {
        currentErrorList.MY_ERROR_LIST.push(`No introduction with id ${entity.id} was found!`)
        return null
    }

    let result = await Introduction.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            description: entity.description,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        return true
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t update this introduction! Some thing went wrong')
        return false
    }
}

export async function deleteExistIntroduction(entity: IntroductionDeleteVm)
{
    currentErrorList.MY_ERROR_LIST = []
    if (!currentUserData.IS_USER_ADMIN)
    {
        currentErrorList.MY_ERROR_LIST.push('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        currentErrorList.MY_ERROR_LIST.push(`Id ${entity.id} is not valid!`)
        return null
    }
    let currentIntroduction = await getIntroductionById(entity.id)
    if (!currentIntroduction)
    {
        currentErrorList.MY_ERROR_LIST.push(`No introduction with id ${entity.id} was found!`)
        return null
    }

    let result = await Introduction.findByIdAndRemove(entity.id)
    if (result)
    {
        return true
    }
    else
    {
        currentErrorList.MY_ERROR_LIST.push('We can`t delete this introduction! Some thing went wrong')
        return false
    }
}

async function checkIfIntroductionWithTheSamePropertiesExist(title: string, description: string)
{
    let currentIntroduction = await Introduction.findOne({
        title: title,
        description: description
    })
    return !!currentIntroduction;
}