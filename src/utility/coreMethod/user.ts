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
import {getVerifyUserEmailByToken} from "./verifyUserEmail";
import {getVerifyUserPhoneNumberByToken} from "./verifyUserPhoneNumber";
import {addNewErrorMessage, emptyMessageList} from "../handler/messageHandler/messageMethod";
import {addNewUserToken, getUserTokenByUserIdAndTokenUniqueCode, updateExistUserTokenIsWorkingYet} from "./userToken";
import {userAuthUniqueTokenMaker} from "../maker";

export async function getCountOfUser()
{
    emptyMessageList()
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

export async function getUserByFilter(filter: any)
{
    emptyMessageList()
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
        .select(`${filter}`)
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
        addNewErrorMessage('Sorry! We can`t get list of users!')
        return null
    }
}

export async function getUserById(id: string)
{
    emptyMessageList()
    let currentUser = await User.findById(id)
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

export async function getUserByEmail(email: string)
{
    emptyMessageList()
    let currentUser = await User.find({
        email: email
    })
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
        addNewErrorMessage('Sorry! We can`t get list of users!')
        return null
    }
}

export async function getUserByPhoneNumber(phoneNumber: string)
{
    emptyMessageList()
    let currentUser = await User.find({
        phoneNumber: phoneNumber
    })
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
        addNewErrorMessage('Sorry! We can`t get list of users!')
        return null
    }
}

export async function getUserByIdAndFilter(id: string, filter: any)
{
    emptyMessageList()
    let currentUser: any
    if (filter)
    {
        currentUser = await User.findById(id)
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

export async function changeExistUserPassword(entity: UserChangePasswordVm)
{
    emptyMessageList()
    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`the id ${entity.id} is not valid!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)

    if (previousUser)
    {
        if (bcrypt.compareSync(entity.oldPassword, previousUser.password))
        {
            if (entity.newPassword == entity.repeatNewPassword)
            {
                let currentUser = await User.findByIdAndUpdate(
                    previousUser.id,
                    {
                        password: bcrypt.hashSync(entity.newPassword, 10)
                    }
                )
                return !!currentUser
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
    else
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }
}

export async function changeExistUserEnableState(entity: UserChangeEnableStateVm)
{
    emptyMessageList()
    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`the id ${entity.id} is not valid!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)

    if (previousUser)
    {
        let currentUser = await User.findByIdAndUpdate(
            previousUser.id,
            {
                isEnabled: !previousUser.isEnabled,
                updateDate: entity.updateDate
            }
        )
        return !!currentUser
    }
    else
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }
}

export async function changeExistUserAdministrationState(entity: UserChangeAdministrationStateVm)
{
    emptyMessageList()
    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`the id ${entity.id} is not valid!`)
        return null
    }

    let previousUser: any = await getUserById(entity.id)

    if (previousUser)
    {
        let currentUser = await User.findByIdAndUpdate(
            previousUser.id,
            {
                isAdmin: !previousUser.isAdmin,
                updateDate: entity.updateDate
            }
        )
        return !!currentUser
    }
    else
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }
}

export async function registerNewUserByItself(entity: UserRegisterItselfVm)
{
    emptyMessageList()
    let userNameExist = await checkIfUserWithTheSameUserNameExist(entity.userName)

    let emailExist: boolean = false
    if (entity.email)
    {
        emailExist = await checkIfUserWithTheSameEmailExist(entity.email);
    }

    let phoneNumberExist: boolean = false;
    if (entity.phoneNumber)
    {
        phoneNumberExist = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber);
    }

    if (!userNameExist && !emailExist && !phoneNumberExist)
    {
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
            gender: currentGender.id,
            city: currentCity.id,
            introduction: currentIntroduction.id
        })
        let result = await currentUser.save()
        if (result)
        {
            console.log(result)
            return true
        }
        else
        {
            addNewErrorMessage('we can not save the user! something went wrong!')
            return false
        }
    }
    else
    {
        addNewErrorMessage('An user with this properties exists!')
        return false
    }
}

export async function addNewUserByAdmin(entity: UserAddByAdminVm): Promise<null | boolean>
{
    emptyMessageList()
    let userNameExist = await checkIfUserWithTheSameUserNameExist(entity.userName)

    let emailExist: boolean = false
    if (entity.email)
    {
        emailExist = await checkIfUserWithTheSameEmailExist(entity.email);
    }

    let phoneNumberExist: boolean = false;
    if (entity.phoneNumber)
    {
        phoneNumberExist = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber);
    }

    if (!userNameExist && !emailExist && !phoneNumberExist)
    {
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
            introduction: currentIntroduction.id
        })
        let result = await currentUser.save()
        if (result)
        {
            console.log(result)
            return true
        }
        else
        {
            addNewErrorMessage('This user can not be added!')
            return false
        }
    }
    else
    {
        addNewErrorMessage('An user with this properties exists!')
        return false
    }
}

export async function updateExistUser(entity: UserUpdateVm)
{
    emptyMessageList()
    let userNameExist = await checkIfUserWithTheSameUserNameExist(entity.userName)

    let emailExist: boolean = false
    if (entity.email)
    {
        emailExist = await checkIfUserWithTheSameEmailExist(entity.email);
    }

    let phoneNumberExist: boolean = false;
    if (entity.phoneNumber)
    {
        phoneNumberExist = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber);
    }

    if (!userNameExist && !emailExist && !phoneNumberExist)
    {
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

        let currentUserForIpList: any = await getUserById(entity.id)
        let userOldIpList: any = currentUserForIpList.ip;
        if (currentAuthType.LOGIN_USER_ID == entity.id)
        {
            userOldIpList.push(entity.ip)
        }

        let currentUser = await User.findByIdAndUpdate(
            entity.id,
            {
                name: entity.name,
                family: entity.family,
                userName: entity.userName,
                email: entity.email,
                phoneNumber: entity.phoneNumber,
                ip: userOldIpList,
                introduction: currentIntroduction.id,
                gender: currentGender.id,
                city: currentCity.id,
                lastLoginDate: currentAuthType.LOGIN_USER_ID == entity.id ? new Date() : null,
                updateDate: entity.updateDate
            }
        )
        if (currentUser)
        {
            return true
        }
        else
        {
            addNewErrorMessage('The user can not be updated!')
            return false
        }
    }
    else
    {
        addNewErrorMessage('An user with this properties exists!')
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
        if (previousUser)
        {
            let currentUser = User.findByIdAndUpdate(
                previousUser.id,
                {
                    isVerifiedEmail: true
                }
            )
            return !!currentUser
        }
        else
        {
            addNewErrorMessage(`No user with email ${currentUserEmail} found!`)
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
        if (previousUser)
        {
            let currentUser = User.findByIdAndUpdate(
                previousUser.id,
                {
                    isVerifiedPhoneNumber: true
                }
            )
            return !!currentUser
        }
        else
        {
            addNewErrorMessage(`No user with phone number ${currentUserPhoneNumber} found!`)
            return null
        }
    }
    else
    {
        addNewErrorMessage('The link for phone number verification is invalid')
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
    if (previousUser)
    {
        let currentUser = User.findByIdAndUpdate(
            entity.id,
            {
                image: entity.image
            }
        )
        return !!currentUser
    }
    else
    {
        addNewErrorMessage(`No user with id ${entity.id} exists!`)
        return null
    }
}

export async function logoutExistUser()
{
    await updateExistUserTokenIsWorkingYet({
        uniqueCode: currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE,
        updateDate: new Date(),
        userId: currentAuthType.LOGIN_USER_ID
    })

    currentAuthType.IS_USER_LOGIN = false
    currentAuthType.LOGIN_USER_ID = ''
    currentAuthType.IS_USER_ADMIN = false
    return true
}

export async function loginExistUser(entity: UserLoginVm)
{
    emptyMessageList()
    let currentUser: any = null

    if (entity.email)
    {
        let wantedUserWithEmail = await User.findOne({
            email: entity.email
        })
        if (wantedUserWithEmail)
        {
            currentUser = wantedUserWithEmail
            console.log('User found with email')
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
            console.log('User found with email')
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
            console.log('User found with email')
        }
    }

    console.log(currentUser)

    if (!currentUser)
    {
        addNewErrorMessage(`No user found with this properties!`)
        return null
    }
    else
    {
        if (bcrypt.compareSync(entity.password, currentUser.password))
        {
            let currentUniqueCode = await userAuthUniqueTokenMaker('userUniqueTokenCode')
            let token = jwt.sign(
                {
                    userId: currentUser.id,
                    isAdmin: currentUser.isAdmin,
                    uniqueCode: currentUniqueCode
                },
                SECRET_JWT,
                {
                    expiresIn: '1w', // Ite means 1 day. You can use 1w for 1 week!
                    algorithm: 'HS256'
                }
            )

            currentAuthType.IS_USER_LOGIN = true
            currentAuthType.LOGIN_USER_ID = currentUser.id
            currentAuthType.IS_USER_ADMIN = currentUser.isAdmin
            currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE = currentUniqueCode

            await addNewUserToken({
                uniqueCode: currentUniqueCode,
                userId: currentUser.id
            })
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
    if (idIsNotValid(entity.id))
    {
        addNewErrorMessage(`The id ${entity.id} is not valid!`)
        return null
    }
    let result = await User.findByIdAndRemove(entity.id)
    return !!result;
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
            let currentUserToken: any = await getUserTokenByUserIdAndTokenUniqueCode(currentAuthType.LOGIN_USER_ID, currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE)
            return currentUserToken.isWorkingYet == true;
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
