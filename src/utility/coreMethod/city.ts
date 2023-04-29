import {City} from "../../mvc/model/city";
import {CityAddVm, CityDeleteVm, CityUpdateVm} from "../type/city";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {State} from "../../mvc/model/state";

export async function getCountOfCity()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfCity = await City.count()
    if (countOfCity)
    {
        return countOfCity
    }
    else
    {
        addNewErrorMessage(`We can not get count of city!`)
        return null
    }
}

export async function getAllCity()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let cityList = await City.find() // TODO: Check if it works!
        .populate({
            path: 'state',
            select: 'title',
            populate: {
                path: 'country',
                select: 'title'
            }
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (cityList)
    {
        return cityList
    }
    else
    {
        addNewErrorMessage(`We can not get list of city!`)
        return null
    }
}

export async function getCityById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentCity = await City.findById(id)
        .populate({
            path: 'state',
            select: 'title',
            populate: {
                path: 'country',
                select: 'title'
            }
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentCity)
    {
        return currentCity
    }
    else
    {
        addNewErrorMessage(`We can not get current city!`)
        return null
    }
}

export async function getCityByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let cityList: any

    if (filter)
    {
        cityList = await City.find()
            .populate({
                path: 'state',
                select: 'title',
                populate: {
                    path: 'country',
                    select: 'title'
                }
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

    if (cityList)
    {
        return cityList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of city!`)
        return null
    }
}

export async function getCityByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No city with id ${id} exists!`)
        return null
    }

    let currentCity: any
    if (filter)
    {
        currentCity = await City.findById(id)
            .populate({
                path: 'state',
                select: 'title',
                populate: {
                    path: 'country',
                    select: 'title'
                }
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
        currentCity = await getCityById(id)
    }

    if (currentCity)
    {
        return currentCity
    }
    else
    {
        addNewErrorMessage(`We can not get current city!`)
        return null
    }
}

export async function addNewCity(entity: CityAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentCityExists = await checkIfCityWithTheSameTitleExist(entity.title, entity.state)
    if (currentCityExists)
    {
        addNewErrorMessage('An city with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.state))
    {
        addNewErrorMessage(`The id ${entity.state} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentState = await State.findById(entity.state)
    if (!currentState)
    {
        addNewErrorMessage('No state with the same id exists! So we can not add any city with the city')
        return null
    }

    let currentCity = new City({
        title: entity.title,
        state: entity.state
    })
    let result = await currentCity.save()
    if (result)
    {
        addNewSuccessMessage('City added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the city can not be saved!')
        return false
    }
}

export async function updateExistCity(entity: CityUpdateVm)
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

    await getCityById(entity.id)

    let currentCityExists = await checkIfCityWithTheSameTitleExist(entity.title, entity.state)
    if (currentCityExists)
    {
        addNewErrorMessage('A city with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.state))
    {
        addNewErrorMessage(`The id ${entity.state} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentState = await State.findById(entity.state)
    if (!currentState)
    {
        addNewErrorMessage('No state with the same id exists! So we can not add any city with the city')
        return null
    }

    let result = await City.findByIdAndUpdate(
        entity.id,
        {
            title: entity.title,
            state: entity.state,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The city updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The city can not be updated!`)
        return false
    }
}

export async function deleteExistCity(entity: CityDeleteVm)
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

    await getCityById(entity.id)

    let result = await City.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The city deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The city can not be deleted!`)
        return false
    }
}

async function checkIfCityWithTheSameTitleExist(
    title: string,
    state: string
)
{
    let currentCity = await City.findOne({
        title: title,
        state: state
    })
    return !!currentCity;
}
