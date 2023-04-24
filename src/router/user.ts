import express from "express";
import {
    addNewUserByAdmin,
    changeExistUserAdministrationState,
    changeExistUserEnableState,
    changeExistUserPassword,
    deleteExistUser,
    getAllUser,
    getCountOfUser,
    getUserByFilter,
    getUserById,
    getUserByIdAndFilter,
    loginExistUser,
    registerNewUserByItself,
    updateExistUserImage,
    updateExistUserVerifyEmail,
    updateExistUserVerifyPhoneNumber
} from "../utility/coreMethod/user";
import {
    UserAddByAdminVm, UserChangeAdministrationStateVm, UserChangeEnableStateVm,
    UserChangePasswordVm,
    UserDeleteVm,
    UserLoginVm,
    UserRegisterItselfVm, UserUpdateImageVm,
    UserUpdateVm, UserVerifyEmailVm, UserVerifyPhoneNumberVm
} from "../utility/type/user";
import {getUploadPath} from "../utility/constant";
import {uploadOptions} from "../utility/diskStorage";

export const userRouter = express.Router()

userRouter.get(
    `/`,
    async (req, res) =>
    {
        let userList = await getAllUser()
        if (userList != null)
        {
            return res.status(200).json(userList)
        }
        else
        {
            return res.status(404).json({
                Message: `No user found!`
            })
        }
    }
)

userRouter.get(
    `/count`,
    async (req, res) =>
    {
        let userCount = await getCountOfUser()
        if (userCount != null)
        {
            return res.status(200).json(`Count of user: ${userCount}`)
        }
        else
        {
            return res.status(404).json({
                Message: `No user found!`
            })
        }
    }
)

userRouter.post(
    `/login`,
    async (req, res) =>
    {
        let userLoginVm: UserLoginVm = {
            email: req.body.email ? req.body.email : '',
            password: req.body.password,
            phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : '',
            userName: req.body.userName ? req.body.userName : ''
        }
        console.log(userLoginVm)
        let userLoginResult = await loginExistUser(userLoginVm)
        if (userLoginResult != null)
        {
            return res.status(200).json(userLoginResult)
        }
        else
        {
            return res.status(404).json({
                Message: `You can\`t login!`
            })
        }
    }
)

userRouter.post(
    '/add_by_admin',
    uploadOptions.single('image'),
    async (req, res) =>
    {
        let currentUserAddVm: UserAddByAdminVm = {
            city: req.body.city ? req.body.city : '',
            email: req.body.email ? req.body.email : '',
            family: req.body.family,
            gender: req.body.gender ? req.body.gender : '',
            image: req.body.image ? `${getUploadPath(req)}${req.file?.filename}` : '',
            introduction: req.body.introduction ? req.body.introduction : '',
            isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
            isEnabled: req.body.isEnabled ? req.body.isEnabled : false,
            isVerifiedEmail: req.body.isVerifiedEmail ? req.body.isVerifiedEmail : false,
            isVerifiedPhoneNumber: req.body.isVerifiedPhoneNumber ? req.body.isVerifiedPhoneNumber : false,
            name: req.body.name,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : '',
            userName: req.body.userName
        }
        let result: boolean | null = await addNewUserByAdmin(currentUserAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Added By Admin Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/add_by_user_itself',
    uploadOptions.single('image'),
    async (req, res) =>
    {
        let currentUserAddVm: UserRegisterItselfVm = {
            name: req.body.name,
            family: req.body.family,
            userName: req.body.userName,
            email: req.body.email ? req.body.email : '',
            phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : '',
            image: req.body.image ? `${getUploadPath(req)}${req.file?.filename}` : '',
            password: req.body.password,
            gender: req.body.gender ? req.body.gender : '',
            city: req.body.city ? req.body.city : '',
            introduction: req.body.introduction ? req.body.introduction : ''
        }
        let result: boolean | null = await registerNewUserByItself(currentUserAddVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Added By Itself Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/change_password/:id',
    async (req, res) =>
    {
        let currentUserChangePasswordVm: UserChangePasswordVm = {
            id: req.params.id,
            newPassword: req.body.newPassword,
            oldPassword: req.body.oldPassword,
            repeatNewPassword: req.body.repeatNewPassword,
            updateDate: new Date()
        }
        let result: boolean | null = await changeExistUserPassword(currentUserChangePasswordVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Password Updated Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/change_enable_state/:id',
    async (req, res) =>
    {
        let currentUserChangeEnableStateVm: UserChangeEnableStateVm = {
            id: req.params.id,
            updateDate: new Date()
        }
        let result: boolean | null = await changeExistUserEnableState(currentUserChangeEnableStateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Enable State Updated Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/change_administration_state/:id',
    async (req, res) =>
    {
        let currentUserChangeAdministrationStateVm: UserChangeAdministrationStateVm = {
            id: req.params.id,
            updateDate: new Date()
        }
        let result: boolean | null = await changeExistUserAdministrationState(currentUserChangeAdministrationStateVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Administration State Updated Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/verify_email',
    async (req, res) =>
    {
        let currentUserVerifyEmailVm: UserVerifyEmailVm = {
            token: req.body.token,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserVerifyEmail(currentUserVerifyEmailVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Email Verified Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/verify_phone_number',
    async (req, res) =>
    {
        let currentUserVerifyPhoneNumberVm: UserVerifyPhoneNumberVm = {
            token: req.body.token,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserVerifyPhoneNumber(currentUserVerifyPhoneNumberVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Phone Number Verified Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.post(
    '/upload_image/:id',
    async (req, res) =>
    {
        if (!req.file)
        {
            return res.status(400).json({
                Message: 'No file exists!'
            })
        }
        let currentUserUpdateImageVm: UserUpdateImageVm = {
            id: req.params.id,
            image: `${getUploadPath(req)}${req.file?.filename}`,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserImage(currentUserUpdateImageVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `Current User Image Updated Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)

userRouter.get(
    `/:id`,
    async (req, res) =>
    {
        let currentUser = await getUserById(req.params.id)
        if (currentUser != null)
        {
            return res.status(200).json(currentUser)
        }
        else
        {
            return res.status(404).json({
                Message: `No user found!`
            })
        }
    }
)

userRouter.get(
    `/by_filter/:filter`,
    async (req, res) =>
    {
        let userList = await getUserByFilter(req.params.filter)
        if (userList != null)
        {
            return res.status(200).json(userList)
        }
        else
        {
            return res.status(404).json({
                Message: `No user found!`
            })
        }
    }
)

userRouter.get(
    `/by_id_and_filter/:id/:filter?`,
    async (req, res) =>
    {
        let userList = await getUserByIdAndFilter(req.params.id, req.params.filter)
        if (userList != null)
        {
            return res.status(200).json(userList)
        }
        else
        {
            return res.status(404).json({
                Message: `No user found!`
            })
        }
    }
)

userRouter.delete(
    '/:id',
    async (req, res) =>
    {
        let currentUserDeleteVm: UserDeleteVm = {
            id: req.params.id
        }
        let result: null | boolean = await deleteExistUser(currentUserDeleteVm)
        if (result == true)
        {
            return res.status(200).json({
                Message: `User Deleted Successfully!`
            })
        }
        else
        {
            return res.status(400).json({
                Message: 'An error occurred!'
            })
        }
    }
)


