import {State} from "../../mvc/model/state";
import {StateAddVm, StateDeleteVm, StateUpdateVm} from "../type/state";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {Country} from "../../mvc/model/country";

export async function getCountOfState()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfState = await State.count()
    if (countOfState)
    {
        return countOfState
    }
    else
    {
        addNewErrorMessage(`We can not get count of state!`)
        return null
    }
}

export async function getAllState()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        addNewErrorMessage(`We can not get list of state!`)
        return null
    }
}

export async function getStateById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current state!`)
        return null
    }
}

export async function getStateByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let stateList: any
    if (filter)
    {
        stateList = await State.find()
            .populate({
                path: 'country',
                select: 'title',
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


    if (stateList)
    {
        return stateList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of state!`)
        return null
    }
}

export async function getStateByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No state with id ${id} exists!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current state!`)
        return null
    }
}

export async function addNewState(entity: StateAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentStateExists = await checkIfStateWithTheSameTitleExist(entity)
    if (currentStateExists)
    {
        addNewErrorMessage('A state with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.country))
    {
        addNewErrorMessage(`The id ${entity.country} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentCountry = await Country.findById(entity.country)
    if (!currentCountry)
    {
        addNewErrorMessage('No country with the same id exists! So we can not add any state with the city')
        return null
    }

    let currentState = new State({
        title: entity.title,
        country: entity.country
    })
    let result = await currentState.save()
    if (result)
    {
        addNewSuccessMessage('State added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the state can not be saved!')
        return false
    }
}

export async function updateExistState(entity: StateUpdateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getStateById(entity.id)

    let currentStateExists = await checkIfStateWithTheSameTitleExist(entity)
    if (currentStateExists)
    {
        addNewErrorMessage('A state with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.country))
    {
        addNewErrorMessage(`The id ${entity.country} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentCountry = await Country.findById(entity.country)
    if (!currentCountry)
    {
        addNewErrorMessage('No country with the same id exists! So we can not add any state with the city')
        return null
    }

    let result = await State.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            country: entity.country,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage('The state updated successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the state can not be saved!')
        return false
    }
}

export async function deleteExistState(entity: StateDeleteVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getStateById(entity.id)

    let result = await State.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The state deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The state can not be deleted!`)
        return false
    }
}

async function checkIfStateWithTheSameTitleExist(entity: StateAddVm)
{
    let currentState = await State.findOne({
        title: entity.title,
        country: entity.country
    })
    return !!currentState;

}
