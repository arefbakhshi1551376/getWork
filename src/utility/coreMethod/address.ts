import {Address} from "../../mvc/model/address";
import {AddressAddVM, AddressDeleteVM, AddressUpdateVM} from "../type/address";
import {City} from "../../mvc/model/city";
import mongoose from "mongoose";

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
                //populate: 'name'
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
                //populate: 'name'
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

export async function addNewAddress(entity: AddressAddVM): Promise<null | boolean>
{
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
    if (!mongoose.isValidObjectId(entity.id))
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
    await Address.findByIdAndRemove(entity.id)
        .then(value =>
        {
            if (value)
            {
                console.log(value)
                return true
            }
            else
            {
                console.log('Error while removing address!')
                return false
            }
        })
        .catch(reason =>
        {
            console.log(reason)
            return false
        })
}