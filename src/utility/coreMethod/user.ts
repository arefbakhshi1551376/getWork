import {User} from "../../mvc/model/user";
import {
    UserAddByAdminVm, UserChangeAdministrationStateVm, UserChangeEnableStateVm, UserChangePasswordVm,
    UserDeleteVm,
    UserLoginVm, UserRegisterItselfVm, UserUpdateImageVm, UserUpdateVm,
    UserVerifyEmailVm, UserVerifyPhoneNumberVm
} from "../type/user";
import {idIsNotValid} from "../validator";
import bcrypt from "bcryptjs";
import {getGenderById, getGenderByTitle} from "./gender";
import {getCityById} from "./city";
import {getIntroductionById} from "./introduction";
import jwt from "jsonwebtoken";
import {
    currentAuthType,
    SECRET_JWT,
} from "../constant";
import {addNewVerifyUserEmail, getVerifyUserEmailByToken} from "./verifyUserEmail";
import {addNewVerifyUserPhoneNumber, getVerifyUserPhoneNumberByToken} from "./verifyUserPhoneNumber";
import {addNewErrorMessage, addNewSuccessMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {
    addNewUserToken,
    getUserTokenByAndTokenUniqueCode,
    disableExistUserToken,
    getUserTokenById
} from "./userToken";
import {userAuthUniqueTokenMaker} from "../maker";

export async function getCountOfUser()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let countOfUser = await User.count()
    if (countOfUser)
    {
        return countOfUser
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get count of user!')
        return null
    }
}

export async function getAllUser()
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let userList = await User.find()
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'gender',
            select: 'title'
        })
        .populate({
            path: 'city',
            select: 'title',
            populate: {
                path: 'state',
                select: 'title',
                populate: {
                    path: 'country',
                    populate: 'title'
                }
            }
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (userList)
    {
        return userList
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get all of users!')
        return null
    }
}

export async function getUserById(id: string)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentUser = await User.findById(id)
        .populate('userName email phoneNumber name family')
        .populate({
            path: 'introduction',
            select: 'title description'
        })
        .populate({
            path: 'gender',
            select: 'title'
        })
        .populate({
            path: 'city',
            select: 'title',
            populate: {
                path: 'state',
                select: 'title',
                populate: {
                    path: 'country',
                    populate: 'title'
                }
            }
        })
        .sort(
            {
                'createDate': -1
            }
        )

    if (currentUser)
    {
        return currentUser
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get current user!')
        return null
    }
}

export async function getUserByFilter(filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let userList: any

    if (filter)
    {
        userList = await User.find()
            .populate('userName email phoneNumber name family')
            .populate({
                path: 'introduction',
                select: 'title description'
            })
            .populate({
                path: 'gender',
                select: 'title'
            })
            .populate({
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
                }
            })
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

    if (userList)
    {
        return userList
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get list of users!')
        return null
    }
}

export async function getUserByEmail(email: any)
{
    emptyMessageList()

    let currentUser: any

    if (email)
    {
        currentUser = await User.findOne({
            email: email
        })
            .populate('userName email phoneNumber name family')
            .populate({
                path: 'introduction',
                select: 'title description'
            })
            .populate({
                path: 'gender',
                select: 'title'
            })
            .populate({
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
                }
            })
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter an email!`)
        return null
    }

    if (currentUser)
    {
        return currentUser
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get current user!')
        return null
    }
}

export async function getUserByPhoneNumber(phoneNumber: any)
{
    emptyMessageList()

    let currentUser: any

    if (phoneNumber)
    {
        currentUser = await User.findOne({
            phoneNumber: phoneNumber
        })
            .populate('userName email phoneNumber name family')
            .populate({
                path: 'introduction',
                select: 'title description'
            })
            .populate({
                path: 'gender',
                select: 'title'
            })
            .populate({
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
                }
            })
            .sort(
                {
                    'createDate': -1
                }
            );
    }
    else
    {
        addNewErrorMessage(`You have to enter a phone number!`)
        return null
    }

    if (currentUser)
    {
        return currentUser
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get current user!')
        return null
    }
}

export async function getUserByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(id))
    {
        addNewErrorMessage(`Id ${id} is not valid!`)
        return null
    }

    let currentUser: any

    if (filter)
    {
        currentUser = await User.findById(id)
            .populate('userName email phoneNumber name family')
            .populate({
                path: 'introduction',
                select: 'title description'
            })
            .populate({
                path: 'gender',
                select: 'title'
            })
            .populate({
                path: 'city',
                select: 'title',
                populate: {
                    path: 'state',
                    select: 'title',
                    populate: {
                        path: 'country',
                        populate: 'title'
                    }
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
        currentUser = await getUserById(id)
    }

    if (currentUser)
    {
        return currentUser
    }
    else
    {
        addNewErrorMessage('Sorry! We can`t get current user!')
        return null
    }
}

export async function updateExistUserPassword(entity: UserChangePasswordVm)
{
    emptyMessageList()
    if (
        !currentAuthType.IS_USER_ADMIN &&
        entity.id != currentAuthType.LOGIN_USER_ID
    )
    {
        addNewErrorMessage('You can not access this part.')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`the id ${entity.id} is not valid!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)
    if (!previousUser)
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }

    if (bcrypt.compareSync(entity.oldPassword, previousUser.password))
    {
        if (entity.newPassword == entity.repeatNewPassword)
        {
            let result = await User.findByIdAndUpdate(
                previousUser.id,
                {
                    password: bcrypt.hashSync(entity.newPassword, 10),
                    updater: entity.updater ? entity.updater : null,
                    updateDate: entity.updateDate
                }
            )
            if (result)
            {
                await logoutExistUser()
                addNewSuccessMessage(`The password updated successfully!`)
                return true
            }
            else
            {
                addNewErrorMessage(`Something went wrong! The password can not be updated!`)
                return false
            }
        }
        else
        {
            addNewErrorMessage('You have to repeat new password correctly!')
            return null
        }
    }
    else
    {
        addNewErrorMessage('Sorry! Your old password is wrong!')
        return null
    }

}

export async function updateExistUserEnableState(entity: UserChangeEnableStateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`the id ${entity.id} is not valid!`)
        return null
    }

    if (currentAuthType.LOGIN_USER_ID == entity.id)
    {
        addNewErrorMessage(`You can not change your enable state!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)
    if (!previousUser)
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }

    let result = await User.findByIdAndUpdate(
        previousUser.id,
        {
            isEnabled: !previousUser.isEnabled,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        if (previousUser.isEnabled == true)
        {
            addNewSuccessMessage(`User ${previousUser.userName} enabled successfully successfully!`)
        }
        else
        {
            addNewSuccessMessage(`User ${previousUser.userName} disabled successfully successfully!`)
        }
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be updated!`)
        return false
    }
}

export async function updateExistUserAdministrationState(entity: UserChangeAdministrationStateVm)
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`the id ${entity.id} is not valid!`)
        return null
    }

    if (currentAuthType.LOGIN_USER_ID == entity.id)
    {
        addNewErrorMessage(`You can not change your administration state!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)
    if (!previousUser)
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }

    let result = await User.findByIdAndUpdate(
        previousUser.id,
        {
            isAdmin: !previousUser.isAdmin,
            updater: entity.updater,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        if (previousUser.isAdmin == false)
        {
            addNewSuccessMessage(`User ${previousUser.userName} is admin now!!`)
        }
        else
        {
            addNewSuccessMessage(`User ${previousUser.userName} is not admin any more!!`)
        }
        return true
    }
    else
    {
        addNewErrorMessage(`Something went wrong! The address can not be updated!`)
        return false
    }
}

export async function registerNewUserByItself(entity: UserRegisterItselfVm)
{
    emptyMessageList()

    if (currentAuthType.LOGIN_USER_ID && currentAuthType.LOGIN_USER_ID != '')
    {
        addNewErrorMessage('You are log in and can not login again!')
        return null
    }

    let currentUserWithUserNameExists = await checkIfUserWithTheSameUserNameExist(entity.userName)
    if (currentUserWithUserNameExists)
    {
        addNewErrorMessage(`The user with user name ${entity.userName} exists!`)
        return null
    }

    let currentUserWithEmailExists: boolean = false
    if (entity.email)
    {
        currentUserWithEmailExists = await checkIfUserWithTheSameEmailExist(entity.email);
        if (currentUserWithEmailExists)
        {
            addNewErrorMessage(`The user with email ${entity.email} exists!`)
            return null
        }
    }

    let currentUserWithPhoneNumberExists: boolean = false;
    if (entity.phoneNumber)
    {
        currentUserWithPhoneNumberExists = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber);
        if (currentUserWithPhoneNumberExists)
        {
            addNewErrorMessage(`The user with phone number ${entity.phoneNumber} exists!`)
            return null
        }
    }

    let currentGender: any
    if (entity.gender)
    {
        if (idIsNotValid(entity.gender))
        {
            addNewErrorMessage('Gender id exists but it is not valid!' +
                'So we set it manually!')
            currentGender = await getGenderByTitle('Not Detected')
            entity.gender = currentGender.id
        }
        else
        {
            currentGender = await getGenderById(entity.gender)
            if (!currentGender)
            {
                addNewErrorMessage(`We can not find any gender with id ${entity.gender}! So we set it manually!`)
                currentGender = await getGenderByTitle('Not Detected')
            }
            entity.gender = currentGender.id
        }
    }
    else
    {
        addNewErrorMessage('Gender id does not exist!' +
            'So we set it manually!')
        currentGender = await getGenderByTitle('Not Detected')
        entity.gender = currentGender.id
    }

    let currentCity: any
    if (entity.city)
    {
        if (idIsNotValid(entity.city))
        {
            addNewErrorMessage('City id exists but it is not valid!')
            return null
        }
        else
        {
            currentCity = await getCityById(entity.city)
            if (!currentCity)
            {
                addNewErrorMessage(`We can not find any city with id ${entity.city}!`)
                return null
            }
        }
    }
    else
    {
        addNewErrorMessage('City id does not exist')
        return null
    }

    let currentIntroduction: any
    if (entity.introduction)
    {
        if (idIsNotValid(entity.introduction))
        {
            addNewErrorMessage('Introduction id exists but it is not valid!')
            return null
        }
        else
        {
            currentIntroduction = await getIntroductionById(entity.introduction)
            if (!currentIntroduction)
            {
                addNewErrorMessage(`We can not find any introduction with id ${entity.introduction}!`)
                return null
            }
        }
    }
    else
    {
        addNewErrorMessage('Introduction id does not exist')
        return null
    }

    let currentUser = new User({
        name: entity.name,
        family: entity.family,
        userName: entity.userName,
        email: entity.email,
        phoneNumber: entity.phoneNumber,
        image: entity.image,
        password: bcrypt.hashSync(entity.password),
        gender: entity.gender,
        city: entity.city,
        introduction: entity.introduction
    })
    let result = await currentUser.save()
    if (result)
    {
        if (entity.email)
        {
            let generateTokenForVerifyUserEmail = await addNewVerifyUserEmail({
                email: entity.email,
                req: entity.req
            })
            if (generateTokenForVerifyUserEmail)
            {
                addNewSuccessMessage('Please verify your email!')
            }
            else
            {
                addNewErrorMessage('Email verification went wrong!!')
                return false
            }
        }

        if (entity.phoneNumber)
        {
            let generateTokenForVerifyUserPhoneNumber = await addNewVerifyUserPhoneNumber({
                phoneNumber: entity.phoneNumber,
                req: entity.req
            })
            if (generateTokenForVerifyUserPhoneNumber)
            {
                addNewSuccessMessage('Please verify your phone nuber!')
            }
            else
            {
                addNewErrorMessage('Email verification went wrong!!')
                return false
            }
        }

        addNewSuccessMessage('You registered successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('we can not save your data! something went wrong!')
        return false
    }
}

export async function addNewUserByAdmin(entity: UserAddByAdminVm): Promise<null | boolean>
{
    emptyMessageList()
    if (!currentAuthType.IS_USER_ADMIN)
    {
        addNewErrorMessage('You are not admin. So you can`t access this part!')
        return null
    }

    let currentUserWithUserNameExists = await checkIfUserWithTheSameUserNameExist(entity.userName)
    if (currentUserWithUserNameExists)
    {
        addNewErrorMessage(`The user with user name ${entity.userName} exists!`)
        return null
    }

    let currentUserWithEmailExists: boolean = false
    if (entity.email)
    {
        currentUserWithEmailExists = await checkIfUserWithTheSameEmailExist(entity.email);
        if (currentUserWithEmailExists)
        {
            addNewErrorMessage(`The user with email ${entity.email} exists!`)
            return null
        }
    }

    let currentUserWithPhoneNumberExists: boolean = false;
    if (entity.phoneNumber)
    {
        currentUserWithPhoneNumberExists = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber);
        if (currentUserWithPhoneNumberExists)
        {
            addNewErrorMessage(`The user with phone number ${entity.phoneNumber} exists!`)
            return null
        }
    }

    let currentGender: any
    if (entity.gender)
    {
        if (idIsNotValid(entity.gender))
        {
            addNewErrorMessage('Gender id exists but it is not valid!' +
                'So we set it manually!')
            currentGender = await getGenderByTitle('Not Detected')
            return null
        }
        else
        {
            currentGender = await getGenderById(entity.gender)
        }
    }
    else
    {
        addNewErrorMessage('Gender id does not exist!' +
            'So we set it manually!')
        currentGender = await getGenderByTitle('Not Detected')
        return null
    }

    let currentCity: any
    if (entity.city)
    {
        if (idIsNotValid(entity.city))
        {
            addNewErrorMessage('City id exists but it is not valid!')
            return null
        }
        else
        {
            currentCity = await getCityById(entity.city)
        }
    }
    else
    {
        addNewErrorMessage('City id does not exist')
        return null
    }

    let currentIntroduction: any
    if (entity.introduction)
    {
        if (idIsNotValid(entity.introduction))
        {
            addNewErrorMessage('Introduction id exists but it is not valid!')
            return null
        }
        else
        {
            currentIntroduction = await getIntroductionById(entity.introduction)
        }
    }
    else
    {
        addNewErrorMessage('Introduction id does not exist')
        return null
    }

    let currentUser = new User({
        name: entity.name,
        family: entity.family,
        userName: entity.userName,
        email: entity.email,
        phoneNumber: entity.phoneNumber,
        image: entity.image,
        password: bcrypt.hashSync(entity.password),
        isEnabled: entity.isEnabled,
        isAdmin: entity.isAdmin,
        isVerifiedEmail: entity.isVerifiedEmail,
        isVerifiedPhoneNumber: entity.isVerifiedPhoneNumber,
        gender: currentGender.id,
        city: currentCity.id,
        introduction: currentIntroduction.id,
        creator: entity.creator
    })
    let result = await currentUser.save()
    if (result)
    {
        if (entity.email)
        {
            let generateTokenForVerifyUserEmail = await addNewVerifyUserEmail({
                email: entity.email,
                req: entity.req
            })
            if (generateTokenForVerifyUserEmail)
            {
                addNewSuccessMessage('Please verify your email!')
            }
            else
            {
                addNewErrorMessage('Email verification went wrong!!')
                return false
            }
        }

        if (entity.phoneNumber)
        {
            let generateTokenForVerifyUserPhoneNumber = await addNewVerifyUserPhoneNumber({
                phoneNumber: entity.phoneNumber,
                req: entity.req
            })
            if (generateTokenForVerifyUserPhoneNumber)
            {
                addNewSuccessMessage('Please verify your phone nuber!')
            }
            else
            {
                addNewErrorMessage('Email verification went wrong!!')
                return false
            }
        }

        addNewSuccessMessage('the user added successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('we can not save the user! something went wrong!')
        return false
    }
}

export async function updateExistUser(entity: UserUpdateVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is invalid!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)

    if (!previousUser)
    {
        addNewErrorMessage(`The user with id ${previousUser.id} does not exists`)
    }

    let currentUserWithUserNameExists: null | boolean = false
    if (entity.userName)
    {
        currentUserWithUserNameExists = await checkIfThisUserNameIsValidForCurrentUserToUpdate(
            entity.id,
            entity.userName
        );

        if (!currentUserWithUserNameExists)
        {
            addNewErrorMessage(`The user with user name ${entity.userName} exists!`)
            return null
        }
    }
    else
    {
        entity.userName = previousUser.userName
    }

    let currentUserWithEmailExists: null | boolean = false
    if (entity.email)
    {
        currentUserWithEmailExists = await checkIfThisEmailIsValidForCurrentUserToUpdate(
            entity.id,
            entity.email
        );

        if (!currentUserWithEmailExists)
        {
            addNewErrorMessage(`The user with email ${entity.email} exists!`)
            return null
        }
    }
    else
    {
        entity.email = previousUser.email
    }

    let currentUserWithPhoneNumberExists: null | boolean = false;
    if (entity.phoneNumber)
    {
        currentUserWithPhoneNumberExists = await checkIfThisPhoneNumberIsValidForCurrentUserToUpdate(
            entity.id,
            entity.phoneNumber
        );

        if (!currentUserWithPhoneNumberExists)
        {
            addNewErrorMessage(`The user with phone number ${entity.phoneNumber} exists!`)
            return null
        }
    }
    else
    {
        entity.phoneNumber = previousUser.phoneNumber
    }

    let currentGender: any
    if (entity.gender)
    {
        if (idIsNotValid(entity.gender))
        {
            addNewErrorMessage('Gender id exists but it is not valid!' +
                'So we leave it!')
            entity.gender = previousUser.gender
        }
        else
        {
            currentGender = await getGenderById(entity.gender)
            if (!currentGender)
            {
                addNewErrorMessage(`We can not find any gender with id ${entity.gender}! So we leave it!`)
                entity.gender = previousUser.gender.id
            }
            else
            {
                entity.gender = currentGender.id
            }
        }
    }
    else
    {
        addNewErrorMessage('Gender id does not exist!' +
            'So we set it manually!')
        entity.gender = previousUser.gender
    }

    let currentCity: any
    if (entity.city)
    {
        if (idIsNotValid(entity.city))
        {
            addNewErrorMessage('City id exists but it is not valid! so we leave it!')
            entity.city = previousUser.city
        }
        else
        {
            currentCity = await getCityById(entity.city)
            if (!currentCity)
            {
                addNewErrorMessage(`We can not find any city with id ${entity.city}! So we leave it!`)
                entity.city = previousUser.city.id
            }
            else
            {
                entity.city = currentCity.id
            }
        }
    }
    else
    {
        addNewErrorMessage('City id does not exist! So we leave it!')
        entity.city = previousUser.city
    }

    let currentIntroduction: any
    if (entity.introduction)
    {
        if (idIsNotValid(entity.introduction))
        {
            addNewErrorMessage('Introduction id exists but it is not valid! So we leave it!')
            entity.introduction = previousUser.introduction
        }
        else
        {
            currentIntroduction = await getIntroductionById(entity.introduction)
            if (!currentIntroduction)
            {
                addNewErrorMessage(`We can not find any introduction with id ${entity.introduction}! So we leave it!`)
                entity.introduction = previousUser.introduction.id
            }
            else
            {
                entity.introduction = currentIntroduction.id
            }
        }
    }
    else
    {
        addNewErrorMessage('Introduction id does not exist! So we leave it!')
        entity.introduction = previousUser.introduction
    }

    let currentUserIpList: any = previousUser.ip
    if (!currentUserIpList.includes(entity.ip))
    {
        if (currentAuthType.LOGIN_USER_ID == entity.id)
        {
            currentUserIpList.push(entity.ip)
        }
    }
    let currentUser = await User.findByIdAndUpdate(
        entity.id,
        {
            name: entity.name,
            family: entity.family,
            userName: entity.userName,
            email: entity.email,
            phoneNumber: entity.phoneNumber,
            ip: currentUserIpList,
            introduction: entity.introduction,
            gender: entity.gender,
            city: entity.city,
            lastLoginDate: currentAuthType.LOGIN_USER_ID == entity.id ? new Date() : previousUser.lastLoginDate,
            updater: entity.updater ? entity.updater : previousUser.updater ? previousUser.updater : null,
            updateDate: entity.updateDate,
        }
    )
    if (currentUser)
    {
        addNewSuccessMessage(`The user updated successfully!`)
        return true
    }
    else
    {
        addNewErrorMessage('The user can not be updated!')
        return false
    }
}

export async function updateExistUserVerifyEmail(entity: UserVerifyEmailVm)
{
    emptyMessageList()
    let currentVerifyUserEmail: any = await getVerifyUserEmailByToken(entity.token)
    if (currentVerifyUserEmail)
    {
        let currentUserEmail = currentVerifyUserEmail.email
        let previousUser: any = await getUserByEmail(currentUserEmail)
        if (!previousUser)
        {
            addNewErrorMessage(`No user with email ${currentUserEmail} exists!`)
            return null
        }

        let result = await User.findByIdAndUpdate(
            previousUser.id,
            {
                isVerifiedEmail: true,
                updateDate: entity.updateDate
            }
        )

        if (result)
        {
            addNewSuccessMessage('Your email verified successfully!')
            return true
        }
        else
        {
            addNewErrorMessage('Something went wrong!')
            return null
        }
    }
    else
    {
        addNewErrorMessage('The link for email verification is invalid')
        return null
    }
}

export async function updateExistUserVerifyPhoneNumber(entity: UserVerifyPhoneNumberVm)
{
    emptyMessageList()
    let currentVerifyUserPhoneNumber: any = await getVerifyUserPhoneNumberByToken(entity.token)
    if (currentVerifyUserPhoneNumber)
    {
        let currentUserPhoneNumber = currentVerifyUserPhoneNumber.phoneNumber
        let previousUser: any = await getUserByPhoneNumber(currentUserPhoneNumber)
        if (!previousUser)
        {
            addNewErrorMessage(`No user with phone number ${currentUserPhoneNumber} exists!`)
            return null
        }

        let result = await User.findByIdAndUpdate(
            previousUser.id,
            {
                isVerifiedPhoneNumber: true,
                updateDate: entity.updateDate
            }
        )
        if (result)
        {
            addNewSuccessMessage('Your phone number verified successfully!')
            return true
        }
        else
        {
            addNewErrorMessage('Something went wrong!')
            return null
        }
    }
    else
    {
        addNewErrorMessage('The code for phone number verification is invalid')
        return null
    }
}

export async function updateExistUserImage(entity: UserUpdateImageVm)
{
    emptyMessageList()
    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)
    if (!previousUser)
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }

    let result = await User.findByIdAndUpdate(
        entity.id,
        {
            image: entity.image,
            updater: currentAuthType.LOGIN_USER_ID ? currentAuthType.LOGIN_USER_ID : null,
            updateDate: entity.updateDate
        }
    )
    if (result)
    {
        addNewSuccessMessage('User image updated successfully!')
        return true
    }
    else
    {
        addNewErrorMessage('Something went wrong!')
        return null
    }
}

export async function logoutExistUser()
{
    await disableExistUserToken({
        uniqueCode: currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE,
        updateDate: new Date(),
    })

    currentAuthType.LOGIN_USER_ID = ''
    currentAuthType.IS_USER_LOGIN = false
    currentAuthType.IS_USER_ADMIN = false
    return true
}

export async function loginExistUser(entity: UserLoginVm)
{
    emptyMessageList()
    console.log('I am messaging from login method')
    console.log(currentAuthType)

    if (currentAuthType.LOGIN_USER_ID && currentAuthType.LOGIN_USER_ID.length > 0)
    {
        addNewErrorMessage('You are log in and can not login again!')
        return null
    }

    let currentUser: any = null

    if (entity.email)
    {
        let wantedUserWithEmail = await User.findOne({
            email: entity.email
        })
        if (wantedUserWithEmail)
        {
            currentUser = wantedUserWithEmail
        }
    }
    else if (entity.userName)
    {
        let wantedUserWithUserName = await User.findOne({
            userName: entity.userName
        })
        if (wantedUserWithUserName)
        {
            currentUser = wantedUserWithUserName
        }
    }
    else if (entity.phoneNumber)
    {
        let wantedUserWithUPhoneNumber = await User.findOne({
            phoneNumber: entity.phoneNumber
        })
        if (wantedUserWithUPhoneNumber)
        {
            currentUser = wantedUserWithUPhoneNumber
        }
    }

    if (!currentUser)
    {
        addNewErrorMessage(`No user found with this properties!`)
        return null
    }
    else
    {
        if (bcrypt.compareSync(entity.password, currentUser.password))
        {
            let currentUniqueCode: string;
            let result: any
            do
            {
                currentUniqueCode = await userAuthUniqueTokenMaker('userUniqueTokenCode');
                result = await getUserTokenByAndTokenUniqueCode(currentUniqueCode);
            }
            while (result)

            let token = jwt.sign(
                {
                    userId: currentUser.id,
                    uniqueCode: currentUniqueCode
                },
                SECRET_JWT,
                {
                    expiresIn: '1w', // Ite means 1 day. You can use 1w for 1 week!
                    algorithm: 'HS256'
                }
            )

            await addNewUserToken({
                uniqueCode: currentUniqueCode
            })

            currentAuthType.LOGIN_USER_ID = currentUser.id

            return token
        }
        else
        {
            addNewErrorMessage(`No user found with this properties!`)
            return null
        }
    }
}

export async function deleteExistUser(entity: UserDeleteVm)
{
    emptyMessageList()

    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }

    await getUserById(entity.id)

    let result = await User.findByIdAndRemove(entity.id)

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

export async function isAnyUserLogin()
{
    if (
        !currentAuthType.LOGIN_USER_ID ||
        currentAuthType.LOGIN_USER_ID == ''
    )
    {
        return false
    }
    else
    {
        if (
            !currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE ||
            currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE == ''
        )
        {
            return false
        }
        else
        {
            let currentUserToken: any = await getUserTokenByAndTokenUniqueCode(currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE)
            return currentUserToken.isWorkingYet == true;
        }
    }
}

export async function isAnyUserAdmin(): Promise<boolean>
{
    emptyMessageList()

    if (
        !currentAuthType.LOGIN_USER_ID ||
        currentAuthType.LOGIN_USER_ID.length == 0)
    {
        addNewErrorMessage('LOGIN_USER_ID is not available!')
        console.log('LOGIN_USER_ID is not available!')
        return false
    }
    else
    {
        if (idIsNotValid(currentAuthType.LOGIN_USER_ID))
        {
            addNewErrorMessage('LOGIN_USER_ID is not valid!')
            console.log('LOGIN_USER_ID is not valid!')
            return false
        }
        else
        {
            console.log('User id in isAdmin')
            console.log(currentAuthType.LOGIN_USER_ID)

            let currentUser: any = await User.findById(currentAuthType.LOGIN_USER_ID)

            console.log('Current user in isAdmin method!')
            console.log(currentUser)

            if (!currentUser)
            {
                addNewErrorMessage('No user with LOGIN_USER_ID exists!')
                console.log('No user with LOGIN_USER_ID exists!')
                return false
            }
            else
            {
                let isUserAdmin = currentUser.isAdmin
                if (isUserAdmin == true)
                {
                    addNewSuccessMessage('This user is admin!')
                    console.log('This user is admin!')
                    return true
                }
                else
                {

                    addNewSuccessMessage('This user is not admin!')
                    console.log('This user is not admin!')
                    return false
                }
            }
        }
    }
}

async function checkIfUserWithTheSameUserNameExist(userName: string)
{
    let currentUser = await User.findOne({
        userName: userName
    })
    return !!currentUser;
}

async function checkIfUserWithTheSameEmailExist(email: string)
{
    let currentUser = await User.findOne({
        email: email
    })
    return !!currentUser;
}

async function checkIfUserWithTheSamePhoneNumberExist(phoneNumber: string)
{
    let currentUser = await User.findOne({
        phoneNumber: phoneNumber
    })
    return !!currentUser;
}

async function checkIfThisUserNameIsValidForCurrentUserToUpdate(
    id: string,
    userName: string
)
{
    let currentUser: any = await User.findOne({
        userName: userName
    })

    return !currentUser || currentUser.id == id;
}

async function checkIfThisEmailIsValidForCurrentUserToUpdate(
    id: string,
    email: string
)
{
    let currentUser: any = await User.findOne({
        email: email
    })

    return !currentUser || currentUser.id == id;
}

async function checkIfThisPhoneNumberIsValidForCurrentUserToUpdate(
    id: string,
    phoneNumber: string
)
{
    let currentUser: any = await User.findOne({
        phoneNumber: phoneNumber
    })

    return !currentUser || currentUser.id == id;
}
