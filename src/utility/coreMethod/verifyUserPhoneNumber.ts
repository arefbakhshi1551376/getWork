import {VerifyUserPhoneNumber} from "../../mvc/model/verifyUserPhoneNumber";
import {VerifyUserPhoneNumberAddVm} from "../type/verifyUserPhoneNumber";

export async function getCountOfVerifyUserPhoneNumber()
{
    let countOfVerifyUserPhoneNumber = await VerifyUserPhoneNumber.count()
    if (countOfVerifyUserPhoneNumber)
    {
        return countOfVerifyUserPhoneNumber
    }
    else
    {
        return null
    }
}

export async function getAllVerifyUserPhoneNumber()
{
    let verifyUserPhoneNumberList = await VerifyUserPhoneNumber.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (verifyUserPhoneNumberList)
    {
        return verifyUserPhoneNumberList
    }
    else
    {
        return null
    }
}

export async function getVerifyUserPhoneNumberByFilter(filter: any)
{
    let verifyUserPhoneNumberList = await VerifyUserPhoneNumber.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (verifyUserPhoneNumberList)
    {
        return verifyUserPhoneNumberList
    }
    else
    {
        return null
    }
}

export async function getVerifyUserPhoneNumberById(id: string)
{
    let currentVerifyUserPhoneNumber = await VerifyUserPhoneNumber.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentVerifyUserPhoneNumber)
    {
        return currentVerifyUserPhoneNumber
    }
    else
    {
        return null
    }
}

export async function getVerifyUserPhoneNumberByToken(token: string)
{
    let currentVerifyUserPhoneNumber = await VerifyUserPhoneNumber.find({
        token: token
    })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentVerifyUserPhoneNumber)
    {
        return currentVerifyUserPhoneNumber
    }
    else
    {
        return null
    }
}

export async function getVerifyUserPhoneNumberByIdAndFilter(id: string, filter: any)
{

    let currentVerifyUserPhoneNumber: any
    if (filter)
    {
        currentVerifyUserPhoneNumber = await VerifyUserPhoneNumber.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentVerifyUserPhoneNumber = await getVerifyUserPhoneNumberById(id)
    }

    if (currentVerifyUserPhoneNumber)
    {
        return currentVerifyUserPhoneNumber
    }
    else
    {
        return null
    }
}

export async function addNewVerifyUserPhoneNumber(entity: VerifyUserPhoneNumberAddVm): Promise<null | boolean>
{
    let currentVerifyUserPhoneNumber = new VerifyUserPhoneNumber({
        phoneNumber: entity.phoneNumber
    })
    let result = await currentVerifyUserPhoneNumber.save()
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