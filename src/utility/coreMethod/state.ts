import {State} from "../../mvc/model/state";
import {StateAddVm, StateDeleteVm, StateUpdateVm} from "../type/state";
import {getCountryById} from "./country";
import {idIsNotValid} from "../validator";

export async function getCountOfState()
{
    let countOfState = await State.count()
    if (countOfState)
    {
        return countOfState
    }
    else
    {
        return null
    }
}

export async function getAllState()
{
    let stateList = await State.find()
        .populate({
            path: 'country',
            select: 'title',
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (stateList)
    {
        return stateList
    }
    else
    {
        return null
    }
}

export async function getStateByFilter(filter: any)
{
    let stateList = await State.find()
        .populate({
            path: 'country',
            select: 'title',
        })
        .select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (stateList)
    {
        return stateList
    }
    else
    {
        return null
    }
}

export async function getStateById(id: string)
{
    let currentState = await State.findById(id)
        .populate({
            path: 'country',
            select: 'title',
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentState)
    {
        return currentState
    }
    else
    {
        return null
    }
}

export async function getStateByIdAndFilter(id: string, filter: any)
{
    let currentState: any
    if (filter)
    {
        currentState = await State.findById(id)
            .populate({
                path: 'country',
                select: 'title',
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
        currentState = await getStateById(id)
    }

    if (currentState)
    {
        return currentState
    }
    else
    {
        return null
    }
}

export async function addNewState(entity: StateAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfStateWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.country))
        {
            return null
        }
        let currentCountry = await getCountryById(entity.country)
        if (currentCountry)
        {
            let currentState = new State({
                title: entity.title,
                country: entity.country
            })
            let result = await currentState.save()
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
        return false
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

export async function updateExistState(entity: StateUpdateVm)
{
    let titleExist = await checkIfStateWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id) || idIsNotValid(entity.country))
        {
            return null
        }
        let currentCountry = await getCountryById(entity.country)
        if (currentCountry)
        {
            let currentState = await State.findByIdAndUpdate(
                entity.id,
                {
                    title: entity.title,
                    country: entity.country,
                    updateDate: entity.updateDate
                }
            )
            return !!currentState;
        }
        return false
    }
    else
    {
        return false
    }
}

export async function deleteExistState(entity: StateDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await State.findByIdAndRemove(entity.id)
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

async function checkIfStateWithTheSameTitleExist(title: string)
{
    let currentState = await State.findOne({
        title: title
    })
    return !!currentState;

}
