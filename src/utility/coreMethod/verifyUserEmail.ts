import {VerifyUserEmail} from "../../mvc/model/verifyUserEmail";
import {VerifyUserEmailAddVm, VerifyUserEmailUpdateVm} from "../type/verifyUserEmail";

export async function getCountOfVerifyUserEmail()
{
    let countOfVerifyUserEmail = await VerifyUserEmail.count()
    if (countOfVerifyUserEmail)
    {
        return countOfVerifyUserEmail
    }
    else
    {
        return null
    }
}

export async function getAllVerifyUserEmail()
{
    let verifyUserEmailList = await VerifyUserEmail.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (verifyUserEmailList)
    {
        return verifyUserEmailList
    }
    else
    {
        return null
    }
}

export async function getVerifyUserEmailByFilter(filter: any)
{
    let verifyUserEmailList = await VerifyUserEmail.find().select(`${filter}`)
        .sort(
            {
                'createDate': -1
            }
        )

    if (verifyUserEmailList)
    {
        return verifyUserEmailList
    }
    else
    {
        return null
    }
}

export async function getVerifyUserEmailById(id: string)
{
    let currentVerifyUserEmail = await VerifyUserEmail.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentVerifyUserEmail)
    {
        return currentVerifyUserEmail
    }
    else
    {
        return null
    }
}

export async function getVerifyUserEmailByToken(token: string)
{
    let currentVerifyUserEmail = await VerifyUserEmail.find({
        token: token
    })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentVerifyUserEmail)
    {
        return currentVerifyUserEmail
    }
    else
    {
        return null
    }
}

export async function getVerifyUserEmailByIdAndFilter(id: string, filter: any)
{

    let currentVerifyUserEmail: any
    if (filter)
    {
        currentVerifyUserEmail = await VerifyUserEmail.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentVerifyUserEmail = await getVerifyUserEmailById(id)
    }

    if (currentVerifyUserEmail)
    {
        return currentVerifyUserEmail
    }
    else
    {
        return null
    }
}

export async function addNewVerifyUserEmail(entity: VerifyUserEmailAddVm): Promise<null | boolean>
{
    let currentVerifyUserEmail = new VerifyUserEmail({
        email: entity.email
    })
    let result = await currentVerifyUserEmail.save()
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