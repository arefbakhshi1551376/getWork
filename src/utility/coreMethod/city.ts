import {City} from "../../mvc/model/city";
import {CityAddVm, CityDeleteVm, CityUpdateVm} from "../type/city";
import {idIsNotValid} from "../validator";
import {getStateById} from "./state";

export async function getCountOfCity()
{
    let countOfCity = await City.count()
    if (countOfCity)
    {
        return countOfCity
    }
    else
    {
        return null
    }
}

export async function getAllCity()
{
    let cityList = await City.find() // TODO: Check if it works!
        .populate({
            path: 'State',
            populate: {
                path: 'Country',
                populate: 'title'
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
        return null
    }
}

export async function getCityByFilter(filter: any)
{
    let cityList = await City.find()
        .populate({
            path: 'State',
            populate: {
                path: 'Country',
                populate: 'title'
            }
        })
        .select(`${filter}`)
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
        return null
    }
}

export async function getCityById(id: string)
{
    let currentCity = await City.findById(id)
        .populate({
            path: 'State',
            populate: {
                path: 'Country',
                populate: 'title'
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
        return null
    }
}

export async function getCityByIdAndFilter(id: string, filter: any)
{
    let currentCity: any
    if (filter)
    {
        currentCity = await City.findById(id)
            .populate({
                path: 'State',
                populate: {
                    path: 'Country',
                    populate: 'title'
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
        currentCity = await City.findById(id)
            .populate({
                path: 'State',
                populate: {
                    path: 'Country',
                    populate: 'title'
                }
            })
            .sort(
                {
                    'createDate': -1
                }
            )
    }

    if (currentCity)
    {
        return currentCity
    }
    else
    {
        return null
    }
}

export async function addNewCity(entity: CityAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfCityWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.state))
        {
            return null
        }
        let currentState = await getStateById(entity.state)
        if (currentState)
        {
            let currentCity = new City({
                title: entity.title,
                state: entity.state
            })
            let result = await currentCity.save()
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

export async function updateExistCity(entity: CityUpdateVm)
{
    let titleExist = await checkIfCityWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id) || idIsNotValid(entity.state))
        {
            return null
        }
        let currentState = await getStateById(entity.state)
        if (currentState)
        {
            let currentCity = await City.findByIdAndUpdate(
                entity.id,
                {
                    title: entity.title,
                    state: entity.state,
                    updateDate: entity.updateDate
                }
            )
            return !!currentCity;
        }
        return false
    }
    else
    {
        return false
    }
}

export async function deleteExistCity(entity: CityDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await City.findByIdAndRemove(entity.id)
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

async function checkIfCityWithTheSameTitleExist(title: string)
{
    let currentCity = await City.findOne({
        title: title
    })
    return !!currentCity;

}
