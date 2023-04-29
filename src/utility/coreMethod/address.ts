import {Address} from "../../mvc/model/address";
import {AddressAddVM, AddressDeleteVM, AddressUpdateVM} from "../type/address";
import {City} from "../../mvc/model/city";
import {idIsNotValid} from "../validator";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {getCityById} from "./city";

export async function getCountOfAddress()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfAddress = await Address.count()
    if (countOfAddress)
    {
        return countOfAddress
    }
    else
    {
        addNewErrorMessage(`We can not get count of address!`)
        return null
    }
}

export async function getAllAddress()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let addressList = await Address.find()
        .populate(
            {
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        select: 'title',
                    }
                }
            }
        )
        .sort(
            {
                'createDate': -1
            }
        )

    if (addressList)
    {
        return addressList
    }
    else
    {
        addNewErrorMessage(`We can not get list of address!`)
        return null
    }
}

export async function getAddressById(id: string)
{
    emptyMessageList()
    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentAddress = await Address.findById(id)
        .populate(
            {
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        select: 'title',
                    }
                }
            }
        )
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentAddress)
    {
        return currentAddress
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function getAddressByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let addressList: any

    if (filter)
    {
        addressList = await Address.find()
            .populate(
                {
                    path: 'city',
                    select: 'title',
                    populate: {
                        path: 'state',
                        select: 'title',
                        populate: {
                            path: 'country',
                            select: 'title',
                        }
                    }
                }
            )
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

    if (addressList)
    {
        return addressList
    }
    else
    {
        addNewErrorMessage(`We can\`t get list of address!`)
        return null
    }
}

export async function getAddressByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`No address with id ${id} exists!`)
        return null
    }

    let currentAddress: any
    if (filter)
    {
        currentAddress = await Address.findById(id)
            .populate(
                {
                    path: 'city',
                    select: 'title',
                    populate: {
                        path: 'state',
                        select: 'title',
                        populate: {
                            path: 'country',
                            select: 'title',
                        }
                    }
                }
            )
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentAddress = await getAddressById(id)
    }

    if (currentAddress)
    {
        return currentAddress
    }
    else
    {
        addNewErrorMessage(`We can not get current address!`)
        return null
    }
}

export async function addNewAddress(entity: AddressAddVM): Promise<null | boolean>
{
    emptyMessageList()

    let currentAddressExists = await checkIfAddressWithTheSamePropertiesExist(entity.city, entity.restOfAddress)
    if (currentAddressExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.city))
    {
        addNewErrorMessage(`The id ${entity.city} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentCity = await getCityById(entity.city)
    if (!currentCity)
    {
        addNewErrorMessage('No city with the same id exists! So we can not add any address with the city')
        return null
    }

    let currentAddress = new Address({
        city: entity.city,
        restOfAddress: entity.restOfAddress,
        creator: currentAuthType.LOGIN_USER_ID
    })
    let result = await currentAddress.save()
    if (result)
    {
        addNewSuccessMessage('Address added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong! the address can not be saved!')
        return false
    }
}

export async function updateExistAddress(entity: AddressUpdateVM)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getAddressById(entity.id)

    let currentAddressExists = await checkIfAddressWithTheSamePropertiesExist(entity.city, entity.restOfAddress)
    if (currentAddressExists)
    {
        addNewErrorMessage('An address with the same properties exists!')
        return null
    }

    if (idIsNotValid(entity.city))
    {
        addNewErrorMessage(`The id ${entity.city} is invalid and can not be belonged to any city!`)
        return null
    }

    let currentCity = await City.findById(entity.city)
    if (!currentCity)
    {
        addNewErrorMessage('No city with the same id exists! So we can not add any address with the city')
        return null
    }

    let result = await Address.findByIdAndUpdate(
        entity.id,
        {
            city: entity.city,
            restOfAddress: entity.restOfAddress,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage(`The address updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be updated!`)
        return false
    }
}

export async function deleteExistAddress(entity: AddressDeleteVM)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    await getAddressById(entity.id)

    let result = await Address.findByIdAndRemove(entity.id)
    if (result)
    {
        addNewSuccessMessage(`The address deleted successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be deleted!`)
        return false
    }
}

async function checkIfAddressWithTheSamePropertiesExist(
    city: string,
    restOfAddress: string
)
{
    let currentAddress = await Address.findOne({
        city: city,
        restOfAddress: restOfAddress
    })
    return !!currentAddress;
}
