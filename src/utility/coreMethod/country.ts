import {Country} from "../../mvc/model/country";
import {CountryAddVm, CountryDeleteVm, CountryUpdateVm} from "../type/country";
import mongoose from "mongoose";
import {idIsNotValid} from "../validator";

export async function getCountOfCountry()
{
    let countOfCountry = await Country.count()
    if (countOfCountry)
    {
        return countOfCountry
    }
    else
    {
        return null
    }
}

export async function getAllCountry()
{
    let countryList: any
    countryList = await Country.find()
        .sort(
            {
                'createDate': -1
            }
        );

    if (countryList)
    {
        for (let i = 0; i < countryList.length; i++)
        {
            console.log(countryList[i].title)
        }
        return countryList
    }
    else
    {
        return null
    }
}

export async function getCountryByFilter(filter: any)
{
    let countryList = await Country.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (countryList)
    {
        return countryList
    }
    else
    {
        return null
    }
}

export async function getCountryById(id: string)
{
    let currentCountry = await Country.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentCountry)
    {
        return currentCountry
    }
    else
    {
        return null
    }
}

export async function getCountryByIdAndFilter(id: string, filter: any)
{

    let currentCountry: any
    if (filter)
    {
        currentCountry = await Country.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentCountry = await getCountryById(id)
    }

    if (currentCountry)
    {
        return currentCountry
    }
    else
    {
        return null
    }
}

export async function addNewCountry(entity: CountryAddVm): Promise<null | boolean>
{
    let titleExist = await checkIfCountryWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentCountry = new Country({
            title: entity.title
        })
        let result = await currentCountry.save()
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

export async function updateExistCountry(entity: CountryUpdateVm)
{
    let titleExist = await checkIfCountryWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        if (idIsNotValid(entity.id))
        {
            return null
        }
        let currentCountry = await Country.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        return !!currentCountry;
    }
    else
    {
        return false
    }
}

export async function deleteExistCountry(entity: CountryDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Country.findByIdAndRemove(entity.id)
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

async function checkIfCountryWithTheSameTitleExist(title: string)
{
    let currentCountry = await Country.findOne({
        title: title
    })
    return !!currentCountry;
}