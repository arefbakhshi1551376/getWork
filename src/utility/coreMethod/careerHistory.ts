import {CareerHistory} from "../../mvc/model/careerHistory";
import {CareerHistoryAddVm, CareerHistoryDeleteVm, CareerHistoryUpdateVm} from "../type/careerHistory";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfCareerHistory()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfCareerHistory = await CareerHistory.count()
    if (countOfCareerHistory)
    {
        return countOfCareerHistory
    }
    else
    {
        addNewErrorMessage(`We can not get count of career history!`)
        return null
    }
}

export async function getAllCareerHistory()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let careerHistoryList = await CareerHistory.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (careerHistoryList)
    {
        return careerHistoryList
    }
    else
    {
        addNewErrorMessage(`We can not get list of career history!`)
        return null
    }
}

export async function getCareerHistoryById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No career history with id ${id} exists!`)
        return null
    }

    let currentCareerHistory = await CareerHistory.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentCareerHistory)
    {
        return currentCareerHistory
    }
    else
    {
        addNewErrorMessage(`We can not get current career history!`)
        return null
    }
}

export async function getCareerHistoryByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let careerHistoryList: any

    if (filter)
    {
        careerHistoryList = await CareerHistory.find().select(`${filter}`)
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

    if (careerHistoryList)
    {
        return careerHistoryList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of career history!`)
        return null
    }
}

export async function getCareerHistoryByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No career history with id ${id} exists!`)
        return null
    }

    let currentCareerHistory: any
    if (filter)
    {
        currentCareerHistory = await CareerHistory.findById(id).select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            )
    }
    else
    {
        currentCareerHistory = await getCareerHistoryById(id)
    }

    if (currentCareerHistory)
    {
        return currentCareerHistory
    }
    else
    {
        addNewErrorMessage(`We can not get current career history!`)
        return null
    }
}

export async function addNewCareerHistory(entity: CareerHistoryAddVm): Promise<null | boolean>
{
    emptyMessageList()

    if (entity.endWorkingYear < entity.startWorkingYear)
    {
        addNewErrorMessage('Your end working year must be greater than or equal to start working year!')
        return null
    }

    let currentCareerHistoryExist = await checkIfCareerHistoryWithTheSamePropertiesExist(entity)
    if (currentCareerHistoryExist)
    {
        return true
    }

    let currentCareerHistory = new CareerHistory({
        workPlace: entity.workPlace,
        startWorkingYear: entity.startWorkingYear,
        endWorkingYear: entity.endWorkingYear,
        isWorkingYet: entity.isWorkingYet,
    })
    let result = await currentCareerHistory.save()
    if (result)
    {
        addNewSuccessMessage('Career history added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the career history can not be saved!')
        return false
    }
}

export async function updateExistCareerHistory(entity: CareerHistoryUpdateVm)
{
    emptyMessageList()

    if (entity.endWorkingYear < entity.startWorkingYear)
    {
        addNewErrorMessage('Your end working year must be greater than or equal to start working year!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCareerHistoryById(entity.id)

    let currentCareerHistoryExist = await checkIfCareerHistoryWithTheSamePropertiesExist(entity)
    if (currentCareerHistoryExist)
    {
        addNewErrorMessage('A career history with the same properties exists!')
        return null
    }

    let result = await CareerHistory.findByIdAndUpdate(
        entity.id,
        {
            workPlace: entity.workPlace,
            startWorkingYear: entity.startWorkingYear,
            endWorkingYear: entity.endWorkingYear,
            isWorkingYet: entity.isWorkingYet,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The career history updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The career history can not be updated!`)
        return false
    }
}

export async function deleteExistCareerHistory(entity: CareerHistoryDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getCareerHistoryById(entity.id)

    let result = await CareerHistory.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The career history deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The career history can not be deleted!`)
        return false
    }
}

async function checkIfCareerHistoryWithTheSamePropertiesExist(entity: CareerHistoryAddVm)
{
    let currentCountry = await CareerHistory.findOne({
        workPlace: entity.workPlace,
        startWorkingYear: entity.startWorkingYear,
        endWorkingYear: entity.endWorkingYear,
        isWorkingYet: entity.isWorkingYet,
    })
    return !!currentCountry;
}

