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
    currentErrorList,
    currentUserData,
    SECRET_JWT,
} from "../constant";
import {getVerifyUserEmailByToken} from "./verifyUserEmail";
import {getVerifyUserPhoneNumberByToken} from "./verifyUserPhoneNumber";

export async function getCountOfUser()
{
    let countOfUser = await User.count()
    if (countOfUser)
    {
        return countOfUser
    }
    else
    {
        return null
    }
}

export async function getAllUser()
{
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
        return null
    }
}

export async function getUserByFilter(filter: any)
{
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
        return null
    }
}

export async function getUserById(id: string)
{
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
        return null
    }
}

export async function getUserByEmail(email: string)
{
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
        return null
    }
}

export async function getUserByPhoneNumber(phoneNumber: string)
{
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
        return null
    }
}

export async function getUserByIdAndFilter(id: string, filter: any)
{
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
        return null
    }
}

export async function changeExistUserPassword(entity: UserChangePasswordVm)
{
    if (idIsNotValid(entity.id))
    {
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
                return null
            }
        }
        else
        {
            return null
        }
    }
    else
    {
        return null
    }
}

export async function changeExistUserEnableState(entity: UserChangeEnableStateVm)
{
    if (idIsNotValid(entity.id))
    {
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
        return null
    }
}

export async function changeExistUserAdministrationState(entity: UserChangeAdministrationStateVm)
{
    if (idIsNotValid(entity.id))
    {
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
        return null
    }
}

export async function registerNewUserByItself(entity: UserRegisterItselfVm)
{
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
                currentErrorList.MY_ERROR_LIST.push('Gender id exists but it is not valid!' +
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
            currentErrorList.MY_ERROR_LIST.push('Gender id does not exist!' +
                'So we set it manually!')
            currentGender = await getGenderByTitle('Not Detected')
            return null
        }

        let currentCity: any
        if (entity.city)
        {
            if (idIsNotValid(entity.city))
            {
                currentErrorList.MY_ERROR_LIST.push('City id exists but it is not valid!')
                return null
            }
            else
            {
                currentCity = await getCityById(entity.city)
            }
        }
        else
        {
            currentErrorList.MY_ERROR_LIST.push('City id does not exist')
            return null
        }

        let currentIntroduction: any
        if (entity.introduction)
        {
            if (idIsNotValid(entity.introduction))
            {
                currentErrorList.MY_ERROR_LIST.push('Introduction id exists but it is not valid!')
                return null
            }
            else
            {
                currentIntroduction = await getIntroductionById(entity.introduction)
            }
        }
        else
        {
            currentErrorList.MY_ERROR_LIST.push('Introduction id does not exist')
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
            return false
        }
    }
    else
    {
        return false
    }
}

export async function addNewUserByAdmin(entity: UserAddByAdminVm): Promise<null | boolean>
{
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
                currentErrorList.MY_ERROR_LIST.push('Gender id exists but it is not valid!' +
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
            currentErrorList.MY_ERROR_LIST.push('Gender id does not exist!' +
                'So we set it manually!')
            currentGender = await getGenderByTitle('Not Detected')
            return null
        }

        let currentCity: any
        if (entity.city)
        {
            if (idIsNotValid(entity.city))
            {
                currentErrorList.MY_ERROR_LIST.push('City id exists but it is not valid!')
                return null
            }
            else
            {
                currentCity = await getCityById(entity.city)
            }
        }
        else
        {
            currentErrorList.MY_ERROR_LIST.push('City id does not exist')
            return null
        }

        let currentIntroduction: any
        if (entity.introduction)
        {
            if (idIsNotValid(entity.introduction))
            {
                currentErrorList.MY_ERROR_LIST.push('Introduction id exists but it is not valid!')
                return null
            }
            else
            {
                currentIntroduction = await getIntroductionById(entity.introduction)
            }
        }
        else
        {
            currentErrorList.MY_ERROR_LIST.push('Introduction id does not exist')
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
            return false
        }
    }
    else
    {
        return false
    }
}

export async function updateExistUser(entity: UserUpdateVm)
{
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
                currentErrorList.MY_ERROR_LIST.push('Gender id exists but it is not valid!' +
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
            currentErrorList.MY_ERROR_LIST.push('Gender id does not exist!' +
                'So we set it manually!')
            currentGender = await getGenderByTitle('Not Detected')
            return null
        }

        let currentCity: any
        if (entity.city)
        {
            if (idIsNotValid(entity.city))
            {
                currentErrorList.MY_ERROR_LIST.push('City id exists but it is not valid!')
                return null
            }
            else
            {
                currentCity = await getCityById(entity.city)
            }
        }
        else
        {
            currentErrorList.MY_ERROR_LIST.push('City id does not exist')
            return null
        }

        let currentIntroduction: any
        if (entity.introduction)
        {
            if (idIsNotValid(entity.introduction))
            {
                currentErrorList.MY_ERROR_LIST.push('Introduction id exists but it is not valid!')
                return null
            }
            else
            {
                currentIntroduction = await getIntroductionById(entity.introduction)
            }
        }
        else
        {
            currentErrorList.MY_ERROR_LIST.push('Introduction id does not exist')
            return null
        }

        let currentUserForIpList: any = await getUserById(entity.id)
        let userOldIpList: any = currentUserForIpList.ip;
        if (currentUserData.LOGIN_USER_ID == entity.id)
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
                lastLoginDate: currentUserData.LOGIN_USER_ID == entity.id ? new Date() : null,
                updateDate: entity.updateDate
            }
        )
        return !!currentUser;
    }
    else
    {
        return false
    }
}

export async function updateExistUserVerifyEmail(entity: UserVerifyEmailVm)
{
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
            return null
        }
    }
    else
    {
        return null
    }
}

export async function updateExistUserVerifyPhoneNumber(entity: UserVerifyPhoneNumberVm)
{
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
            return null
        }
    }
    else
    {
        return null
    }
}

export async function updateExistUserImage(entity: UserUpdateImageVm)
{
    if (idIsNotValid(entity.id))
    {
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
        return null
    }
}

export async function loginExistUser(entity: UserLoginVm)
{
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
        return null
    }
    else
    {
        if (bcrypt.compareSync(entity.password, currentUser.password))
        {
            let token = jwt.sign(
                {
                    userId: currentUser.id,
                    isAdmin: currentUser.isAdmin,
                },
                SECRET_JWT,
                {
                    expiresIn: '1w', // Ite means 1 day. You can use 1w for 1 week!
                    algorithm: 'HS256'
                }
            )
            currentUserData.IS_USER_LOGIN = true
            currentUserData.LOGIN_USER_ID = currentUser.id
            currentUserData.IS_USER_ADMIN = currentUser.isAdmin
            return {
                token: token
            }
        }
        else
        {
            return null
        }
    }
}

export async function deleteExistUser(entity: UserDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await User.findByIdAndRemove(entity.id)
    return !!result;


    // let deleteExistRequestByUserIdResult = await deleteExistRequestByJobAd(entity.id)
    // if (deleteExistRequestByUserIdResult)
    // {
    //     let result = await JobAd.findByIdAndRemove(entity.id)
    //     return !!result;
    // }
    // else
    // {
    //     return null
    // }
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
