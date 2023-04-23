import {Address} from "../../mvc/model/address";
import {AddressAddVM, AddressDeleteVM, AddressUpdateVM} from "../type/address";
import {City} from "../../mvc/model/city";
import mongoose from "mongoose";
import {idIsNotValid} from "../validator";
import {CareerHistory} from "../../mvc/model/careerHistory";

export async function getCountOfAddress()
{
    let countOfAddress = await Address.count()
    if (countOfAddress)
    {
        return countOfAddress
    }
    else
    {
        return null
    }
}

export async function getAllAddress()
{
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
        return null
    }
}

export async function getAddressById(id: string)
{
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
        return null
    }
}

export async function getAddressByIdAndFilter(id: string, filter: any)
{
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
        return null
    }
}

export async function getAddressByFilter(filter: any)
{
    let currentAddress = await Address.find()
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
        )

    if (currentAddress)
    {
        return currentAddress
    }
    else
    {
        return null
    }
}

export async function addNewAddress(entity: AddressAddVM): Promise<null | boolean>
{
    let currentAddressExist = await checkIfAddressWithTheSamePropertiesExist(entity)
    if (currentAddressExist)
    {
        return true
    }

    let currentCity = await City.findById(entity.city)
    if (!currentCity)
    {
        return null
    }
    let currentAddress = new Address({
        city: entity.city,
        restOfAddress: entity.restOfAddress,
    })
    let result = await currentAddress.save()
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

export async function updateExistAddress(entity: AddressUpdateVM)
{
    let currentAddressExist = await checkIfAddressWithTheSamePropertiesExist(entity)
    if (currentAddressExist)
    {
        return true
    }

    if (idIsNotValid(entity.id))
    {
        return null
    }
    let currentCity = await City.findById(entity.city)
    if (!currentCity)
    {
        return null
    }
    let currentAddress = await Address.findByIdAndUpdate(
        entity.id,
        {
            city: entity.city,
            restOfAddress: entity.restOfAddress,
            updateDate: entity.updateDate
        }
    )
    return !!currentAddress;
}

export async function deleteExistAddress(entity: AddressDeleteVM)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await Address.findByIdAndRemove(entity.id)
    return !!result;
}


async function checkIfAddressWithTheSamePropertiesExist(entity: AddressAddVM)
{
    let currentAddress = await Address.findOne({
        city: entity.city,
        restOfAddress: entity.restOfAddress
    })
    return !!currentAddress;

}