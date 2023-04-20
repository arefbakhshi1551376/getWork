import {User} from "../../mvc/model/user";
import {UserAddVm, UserDeleteVm, UserUpdateVm} from "../type/user";
import {idIsNotValid} from "../validator";
import {Introduction} from "../type/introduction";
import {Gender} from "../type/gender";
import {City} from "../type/city";
import bcrypt from "bcryptjs";
import {getGenderById, getGenderByTitle} from "./gender";
import {getCityById} from "./city";
import {getIntroductionById} from "./introduction";

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
    let userList = await User.find() // TODO: Check if it works!
        .populate({
            path: 'Introduction',
            populate: 'title description'
        })
        .populate({
            path: 'Gender',
            populate: 'title'
        })
        .populate({
            path: 'City',
            populate: {
                path: 'State',
                populate: {
                    path: 'Country',
                    populate: 'title'
                }
            }
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Status',
                populate: 'title'
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
            path: 'Introduction',
            populate: 'title description'
        })
        .populate({
            path: 'Gender',
            populate: 'title'
        })
        .populate({
            path: 'City',
            populate: {
                path: 'State',
                populate: {
                    path: 'Country',
                    populate: 'title'
                }
            }
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Status',
                populate: 'title'
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
            path: 'Introduction',
            populate: 'title description'
        })
        .populate({
            path: 'Gender',
            populate: 'title'
        })
        .populate({
            path: 'City',
            populate: {
                path: 'State',
                populate: {
                    path: 'Country',
                    populate: 'title'
                }
            }
        })
        .populate({
            path: 'Request',
            populate: {
                path: 'Status',
                populate: 'title'
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
                path: 'Introduction',
                populate: 'title description'
            })
            .populate({
                path: 'Gender',
                populate: 'title'
            })
            .populate({
                path: 'City',
                populate: {
                    path: 'State',
                    populate: {
                        path: 'Country',
                        populate: 'title'
                    }
                }
            })
            .populate({
                path: 'Request',
                populate: {
                    path: 'Status',
                    populate: 'title'
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
        currentUser = await User.findById(id)
            .populate({
                path: 'Introduction',
                populate: 'title description'
            })
            .populate({
                path: 'Gender',
                populate: 'title'
            })
            .populate({
                path: 'City',
                populate: {
                    path: 'State',
                    populate: {
                        path: 'Country',
                        populate: 'title'
                    }
                }
            })
            .populate({
                path: 'Request',
                populate: {
                    path: 'Status',
                    populate: 'title'
                }
            })
            .sort(
                {
                    'createDate': -1
                }
            )
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

export async function addNewUser(entity: UserAddVm): Promise<null | boolean>
{
    let userNameExist = await checkIfUserWithTheSameUserNameExist(entity.userName)
    let emailExist = await checkIfUserWithTheSameEmailExist(entity.email)
    let phoneNumberExist = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber)
    if (!userNameExist && !emailExist && !phoneNumberExist)
    {
        if (
            idIsNotValid(entity.userName) ||
            idIsNotValid(entity.email) ||
            idIsNotValid(entity.phoneNumber) ||
            idIsNotValid(entity.city)
        )
        {
            return null
        }

        let currentGender: any
        if (!entity.gender)
        {
            currentGender = await getGenderByTitle('Not Detected')
        }
        else
        {
            currentGender = await getGenderById(entity.gender)
        }

        let currentCity = await getCityById(entity.city)
        if (!currentCity)
        {
            return null
        }

        let userIpList: string[] = []
        userIpList.push(entity.ip)
        let currentUser = new User({
            name: entity.name,
            family: entity.family,
            userName: entity.userName,
            email: entity.email,
            phoneNumber: entity.phoneNumber,
            image: entity.image,
            password: bcrypt.hashSync(entity.password),
            ip: userIpList,
            gender: currentGender['id'],
            city: entity.city,
            lastLoginDate: new Date()
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

export async function updateExistUser(entity: UserUpdateVm)
{
    let userNameExist = await checkIfUserWithTheSameUserNameExist(entity.userName)
    let emailExist = await checkIfUserWithTheSameEmailExist(entity.email)
    let phoneNumberExist = await checkIfUserWithTheSamePhoneNumberExist(entity.phoneNumber)
    if (!userNameExist && !emailExist && !phoneNumberExist)
    {
        if (
            idIsNotValid(entity.userName) ||
            idIsNotValid(entity.email) ||
            idIsNotValid(entity.phoneNumber) ||
            idIsNotValid(entity.city) ||
            idIsNotValid(entity.introduction)
        )
        {
            return null
        }

        let currentGender: any
        if (!entity.gender)
        {
            currentGender = await getGenderByTitle('Not Detected')
        }
        else
        {
            currentGender = await getGenderById(entity.gender)
        }

        let currentCity = await getCityById(entity.city)
        if (!currentCity)
        {
            return null
        }

        let currentIntroduction = await getIntroductionById(entity.introduction)
        if (!currentIntroduction)
        {
            return null
        }

        let previousUser = await getUserById(entity.id)
        let previousUserIpList: string[];
        if (previousUser)
        {
            previousUserIpList = previousUser['ip'] as string[];
            previousUserIpList.push(entity.ip)
        }

        let currentUser = await User.findByIdAndUpdate(
            entity.id,
            {
                name: entity.name,
                family: entity.family,
                userName: entity.userName,
                email: entity.email,
                phoneNumber: entity.phoneNumber,
                image: entity.image,
                password: bcrypt.hashSync(entity.password),
                ip: previousUserIpList,
                introduction: currentIntroduction['id'],
                gender: currentGender['id'],
                city: entity.city,
                lastLoginDate: new Date(),
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

export async function deleteExistUser(entity: UserDeleteVm)
{
    if (idIsNotValid(entity.id))
    {
        return null
    }
    let result = await User.findByIdAndRemove(entity.id)
    return !!result;
    // .then(value =>
    // {
    //     if (value)
    //     {
    //         console.log(value)
    //         return true
    //     }
    //     else
    //     {
    //         console.log('Error while removing country!')
    //         return false
    //     }
    // })
    // .catch(reason =>
    // {
    //     console.log(reason)
    //     return false
    // })
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
