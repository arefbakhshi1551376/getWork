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

export async function getUserTokenByUserIdAndTokenUniqueCode(userId: string, uniqueCode: string)
{
    emptyMessageList()
    let currentUserToken = await UserToken.findOne({
        uniqueCode: uniqueCode,
        userId: userId
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
        uniqueCode: entity.uniqueCode,
        userId: entity.userId
    })
    let result = await currentUserToken.save()
    if (result)
    {
        return true
    }
    else
    {
        addNewErrorMessage('An error occurred while saving user token!')
        return false
    }
}

export async function updateExistUserTokenIsWorkingYet(entity: UserTokenChangeIsWorkingYetVm): Promise<null | boolean>
{
    emptyMessageList()

    if (idIsNotValid(entity.userId))
    {
        addNewErrorMessage(`The id ${entity.userId} is invalid!`)
        return null
    }

    await getUserById(entity.userId)
    if (entity.userId == currentAuthType.LOGIN_USER_ID)
    {
        addNewErrorMessage('You can not disable yourself')
        return null
    }

    let currentUserToken = await getUserTokenByUserIdAndTokenUniqueCode(entity.userId, entity.uniqueCode)
    if (!currentUserToken)
    {
        addNewErrorMessage('This token is invalid!')
        return null
    }

    let result = await UserToken.findOneAndUpdate({
        uniqueCode: entity.uniqueCode,
        userId: entity.userId
    }, {
        isWorkingYet: false,
        updateDate: entity.updateDate
    }, {
        new: true
    })
    if (result)
    {
        addNewSuccessMessage('The user disabled successfully')
        return true
    }
    else
    {
        addNewErrorMessage('An error occurred while disabling user token!')
        return false
    }
}
