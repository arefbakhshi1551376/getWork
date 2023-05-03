import {Introduction} from "../../mvc/model/introduction";
import {IntroductionAddVm, IntroductionDeleteVm, IntroductionUpdateVm} from "../type/introduction";
import {idIsNotValid} from "../validator";
import {currentAuthType} from "../constant";
import {addNewErrorMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";

export async function getCountOfIntroduction()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfIntroduction = await Introduction.count()
    if (countOfIntroduction)
    {
        return countOfIntroduction
    }
    else
    {
        addNewErrorMessage('We can`t get count of introductions! Some thing went wrong')
        return null
    }
}

export async function getAllIntroduction()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
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
        addNewErrorMessage('We can`t get list of introductions! Some thing went wrong')
        return null
    }
}

export async function getIntroductionByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionList: any
    if (filter)
    {
        introductionList = await Introduction.find().select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        addNewErrorMessage('You have to enter a filter!')
        return null
    }


    if (introductionList)
    {
        return introductionList
    }
    else
    {
        addNewErrorMessage('We can`t get list of introductions! Some thing went wrong')
        return null
    }
}

export async function getIntroductionById(id: string)
{
    emptyMessageList()

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
        addNewErrorMessage('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function getIntroductionByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
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
        addNewErrorMessage('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function addNewIntroduction(entity: IntroductionAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionExists = await checkIfIntroductionWithTheSamePropertiesExist(entity.title, entity.description)
    if (introductionExists)
    {
        addNewErrorMessage('An introduction with the same properties exists!')
        return null
    }

    let currentIntroduction = new Introduction({
        title: entity.title,
        description: entity.description,
        creator: entity.creator
    })
    let result = await currentIntroduction.save()
    if (result)
    {
        return true
    }
    else
    {
        addNewErrorMessage('We can`t save this introduction! Some thing went wrong')
        return false
    }
}

export async function updateExistIntroduction(entity: IntroductionUpdateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let introductionExists = await checkIfIntroductionWithTheSamePropertiesExist(entity.title, entity.description)
    if (introductionExists)
    {
        addNewErrorMessage('An introduction with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`Id ${entity.id} is not valid!`)
        return null
    }
    let currentIntroduction = await getIntroductionById(entity.id)
    if (!currentIntroduction)
    {
        addNewErrorMessage(`No introduction with id ${entity.id} was found!`)
        return null
    }

    let result = await Introduction.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            description: entity.description,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        return true
    }
    else
    {
        addNewErrorMessage('We can`t update this introduction! Some thing went wrong')
        return false
    }
}

export async function deleteExistIntroduction(entity: IntroductionDeleteVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`Id ${entity.id} is not valid!`)
        return null
    }
    let currentIntroduction = await getIntroductionById(entity.id)
    if (!currentIntroduction)
    {
        addNewErrorMessage(`No introduction with id ${entity.id} was found!`)
        return null
    }

    let result = await Introduction.findByIdAndRemove(entity.id)
    if (result)
    {
        return true
    }
    else
    {
        addNewErrorMessage('We can`t delete this introduction! Some thing went wrong')
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