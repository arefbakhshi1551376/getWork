import {UserToken} from "../../mvc/model/userToken";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {currentAuthType} from "../constant";
import {UserTokenAddVm, UserTokenChangeIsWorkingYetVm} from "../type/userToken";
import {idIsNotValid} from "../validator";
import {getUserById} from "./user";

export async function getCountOfUserToken()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfUserToken = await UserToken.count()
    if (countOfUserToken)
    {
        return countOfUserToken
    }
    else
    {
        addNewErrorMessage('We can`t get count of introductions! Some thing went wrong')
        return null
    }
}

export async function getAllUserToken()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let userTokenList = await UserToken.find()
        .sort(
            {
                'createDate': -1
            }
        )

    if (userTokenList)
    {
        return userTokenList
    }
    else
    {
        addNewErrorMessage('We can`t get list of introductions! Some thing went wrong')
        return null
    }
}

export async function getUserTokenByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let userTokenList: any
    if (filter)
    {
        userTokenList = await UserToken.find().select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        addNewErrorMessage('You have to enter a filter!')
        return null
    }

    if (userTokenList)
    {
        return userTokenList
    }
    else
    {
        addNewErrorMessage('We can`t get list of introductions! Some thing went wrong')
        return null
    }
}

export async function getUserTokenById(id: string)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentUserToken = await UserToken.findById(id)
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentUserToken)
    {
        return currentUserToken
    }
    else
    {
        addNewErrorMessage('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function getUserTokenByAndTokenUniqueCode(uniqueCode: string)
{
    emptyMessageList()
    let currentUserToken = await UserToken.findOne({
        uniqueCode: uniqueCode
    })

    if (currentUserToken)
    {
        return currentUserToken
    }
    else
    {
        addNewErrorMessage('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function getUserTokenByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentUserToken: any
    if (filter)
    {
        currentUserToken = await UserToken.findById(id)
            .select(`${filter}`)
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        currentUserToken = await getUserTokenById(id)
    }

    if (currentUserToken)
    {
        return currentUserToken
    }
    else
    {
        addNewErrorMessage('We can`t get current introductions! Some thing went wrong')
        return null
    }
}

export async function addNewUserToken(entity: UserTokenAddVm): Promise<null | boolean>
{
    let currentUserToken = new UserToken({
        uniqueCode: entity.uniqueCode
    })
    let result = await currentUserToken.save()
    if (result)
    {
        addNewSuccessMessage('User token added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('An error occurred while saving user token!')
        return false
    }
}

export async function disableExistUserToken(entity: UserTokenChangeIsWorkingYetVm): Promise<null | boolean>
{
    emptyMessageList()

    let currentUserToken = await getUserTokenByAndTokenUniqueCode(entity.uniqueCode)
    if (!currentUserToken)
    {
        addNewErrorMessage('This token is invalid!')
        return null
    }
    console.log('Current user token BEFORE UPDATES is:')
    console.log(currentUserToken)

    let result = await UserToken.findOneAndUpdate({
        uniqueCode: entity.uniqueCode,
    }, {
        isWorkingYet: false,
        updateDate: entity.updateDate
    })
    if (result)
    {
        console.log('Current user token AFTER UPDATES is:')
        console.log(currentUserToken)
        addNewSuccessMessage('The user disabled successfully')
        return true
    }
    else
    {
        addNewErrorMessage('An error occurred while disabling user token!')
        return false
    }
    // return true
}
