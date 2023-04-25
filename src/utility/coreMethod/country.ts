import {Country} from "../../mvc/model/country";
import {CountryAddVm, CountryDeleteVm, CountryUpdateVm} from "../type/country";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";

export async function getCountOfCountry()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfCountry = await Country.count()
    if (countOfCountry)
    {
        return countOfCountry
    }
    else
    {
        addNewErrorMessage(`We can not get count of country`)
        return null
    }
}

export async function getAllCountry()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countryList: any
    countryList = await Country.find()
        .sort(
            {
                'createDate': -1
            }
        );

    if (countryList)
    {
        return countryList
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getCountryByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countryList: any
    if (filter)
    {
        countryList = await Country.find()
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

    if (countryList)
    {
        return countryList
    }
    else
    {
        addNewErrorMessage(`We can not get list of country`)
        return null
    }
}

export async function getCountryById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`The id ${id} is not valid!`)
        return null
    }

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
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function getCountryByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

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
        addNewErrorMessage(`We can not get current country`)
        return null
    }
}

export async function addNewCountry(entity: CountryAddVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let titleExist = await checkIfCountryWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let currentCountry = new Country({
            title: entity.title
        })
        let result = await currentCountry.save()
        if (result)
        {
            addNewSuccessMessage(`Current country added successfully!`)
            return true
        }
        else
        {
            addNewErrorMessage(`Something went wrong! The country can not be added!`)
            return false
        }
    }
    else
    {
        addNewErrorMessage(`A country with the same properties exists`)
        return false
    }
}

export async function updateExistCountry(entity: CountryUpdateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }
    await getCountryById(entity.id)

    let titleExist = await checkIfCountryWithTheSameTitleExist(entity.title)
    if (!titleExist)
    {
        let result = await Country.findByIdAndUpdate(
            entity.id,
            {
                title: entity.title,
                updateDate: entity.updateDate
            }
        )
        if (result)
        {
            addNewSuccessMessage(`Current country updated successfully!`)
            return true
        }
        else
        {
            addNewErrorMessage(`Something went wrong! The country can not be updated!`)
            return false
        }
    }
    else
    {
        addNewErrorMessage(`A country with the same properties exists`)
        return false
    }
}

export async function deleteExistCountry(entity: CountryDeleteVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }
    await getCountryById(entity.id)

    let result = await Country.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`Current country deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The country can not be deleted!`)
        return false
    }
}

async function checkIfCountryWithTheSameTitleExist(title: string)
{
    let currentCountry = await Country.findOne({
        title: title
    })
    return !!currentCountry;
}