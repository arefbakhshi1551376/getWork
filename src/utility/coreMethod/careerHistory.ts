import {CareerHistory} from "../../mvc/model/careerHistory";
import {CareerHistoryAddVm, CareerHistoryDeleteVm, CareerHistoryUpdateVm} from "../type/careerHistory";
import {idIsNotValid} from "../validator";

export async function getCountOfCareerHistory()
{
    let countOfCareerHistory = await CareerHistory.count()
    if (countOfCareerHistory)
    {
        return countOfCareerHistory
    }
    else
    {
        return null
    }
}

export async function getAllCareerHistory()
{
    let skillCareerHistory = await CareerHistory.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (skillCareerHistory)
    {
        return skillCareerHistory
    }
    else
    {
        return null
    }
}

export async function getCareerHistoryByFilter(filter: any)
{
    let careerHistoryList = await CareerHistory.find().select(`${filter}`)
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
        return null
    }
}

export async function getCareerHistoryById(id: string)
{
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
        return null
    }
}

export async function getCareerHistoryByIdAndFilter(id: string, filter: any)
{
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
        currentCareerHistory = await CareerHistory.findById(id)
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentCareerHistory)
    {
        return currentCareerHistory
    }
    else
    {
        return null
    }
}

export async function addNewCareerHistory(entity: CareerHistoryAddVm): Promise<null | boolean>
{
    let currentCareerHistory = new CareerHistory({
        workPlace: entity.workPlace,
        startWorkingYear: entity.startWorkingYear,
        endWorkingYear: entity.endWorkingYear,
        isWorkingYet: entity.isWorkingYet,
    })
    let result = await currentCareerHistory.save()
    if (result)
    {
        console.log(result)
        return true
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

export async function updateExistCareerHistory(entity: CareerHistoryUpdateVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let currentCareerHistory = await CareerHistory.findByIdAndUpdate(
        entity.id,
        {
            workPlace: entity.workPlace,
            startWorkingYear: entity.startWorkingYear,
            endWorkingYear: entity.endWorkingYear,
            isWorkingYet: entity.isWorkingYet,
            updateDate: entity.updateDate
        }
    )
    return !!currentCareerHistory;
}

export async function deleteExistCareerHistory(entity: CareerHistoryDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await CareerHistory.findByIdAndRemove(entity.id)
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
