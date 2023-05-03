import express from "express";
import {
    addNewUserByAdmin,
    updateExistUserAdministrationState,
    updateExistUserEnableState,
    updateExistUserPassword,
    deleteExistUser,
    getAllUser,
    getCountOfUser,
    getUserByFilter,
    getUserById,
    getUserByIdAndFilter,
    loginExistUser, logoutExistUser,
    registerNewUserByItself,
    updateExistUserImage,
    updateExistUserVerifyEmail,
    updateExistUserVerifyPhoneNumber, getUserByEmail, getUserByPhoneNumber, updateExistUser
} from "../utility/coreMethod/user";
import {
    UserAddByAdminVm, UserChangeAdministrationStateVm, UserChangeEnableStateVm,
    UserChangePasswordVm,
    UserDeleteVm,
    UserLoginVm,
    UserRegisterItselfVm, UserUpdateImageVm, UserUpdateVm,
    UserVerifyEmailVm, UserVerifyPhoneNumberVm
} from "../utility/type/user";
import {currentAuthType, getUploadPath} from "../utility/constant";
import {uploadOptions} from "../utility/diskStorage";
import {
    addNewErrorMessage,
    addNewSuccessMessage, getErrorMessageList,
    getSuccessMessageList
} from "../utility/handler/messageHandler/messageMethod";

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
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.post(
    `/logout`,
    async (req, res) =>
    {
        let result = await logoutExistUser()
        if (result)
        {
            addNewSuccessMessage('You successfully logout')
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            addNewErrorMessage('Something went wrong!')
            return res.status(400).json(getErrorMessageList())
        }
    }
)

userRouter.post(
    '/add_by_admin',
    uploadOptions.single('image'),
    async (req, res) =>
    {
        let currentUserAddVm: UserAddByAdminVm = {
            req: req,
            creator: currentAuthType.LOGIN_USER_ID,
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
        let result = await addNewUserByAdmin(currentUserAddVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
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
            image: req.file ? `${getUploadPath(req)}${req.file?.filename}` : '',
            password: req.body.password,
            gender: req.body.gender ? req.body.gender : '',
            city: req.body.city ? req.body.city : '',
            introduction: req.body.introduction ? req.body.introduction : '',
            req: req
        }
        let result = await registerNewUserByItself(currentUserAddVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.put(
    '/:id',
    uploadOptions.single('image'),
    async (req, res) =>
    {
        let currentUserUpdateVm: UserUpdateVm = {
            city: req.body.city,
            email: req.body.email,
            family: req.body.family,
            gender: req.body.gender,
            id: req.params.id,
            introduction: req.body.introduction,
            ip: req.ip,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            updateDate: new Date(),
            updater: currentAuthType.LOGIN_USER_ID,
            userName: req.body.userName
        }
        console.log(currentUserUpdateVm)
        let result = await updateExistUser(currentUserUpdateVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.put(
    '/change_password',
    async (req, res) =>
    {
        let currentUserChangePasswordVm: UserChangePasswordVm = {
            id: req.body.id,
            newPassword: req.body.newPassword,
            oldPassword: req.body.oldPassword,
            repeatNewPassword: req.body.repeatNewPassword,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserPassword(currentUserChangePasswordVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.post(
    '/change_enable_state/:id',
    async (req, res) =>
    {
        let currentUserChangeEnableStateVm: UserChangeEnableStateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserEnableState(currentUserChangeEnableStateVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.post(
    '/change_administration_state/:id',
    async (req, res) =>
    {
        let currentUserChangeAdministrationStateVm: UserChangeAdministrationStateVm = {
            updater: currentAuthType.LOGIN_USER_ID,
            id: req.params.id,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserAdministrationState(currentUserChangeAdministrationStateVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.get(
    '/verify_email/:token',
    async (req, res) =>
    {
        let currentUserVerifyEmailVm: UserVerifyEmailVm = {
            token: req.params.token,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserVerifyEmail(currentUserVerifyEmailVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.get(
    '/verify_phone_number/:token',
    async (req, res) =>
    {
        let currentUserVerifyPhoneNumberVm: UserVerifyPhoneNumberVm = {
            token: req.params.token,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserVerifyPhoneNumber(currentUserVerifyPhoneNumberVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.put(
    '/upload_image',
    uploadOptions.single('image'),
    async (req, res) =>
    {
        if (!req.file)
        {
            return res.status(400).json({
                Message: 'No file exists!'
            })
        }
        let currentUserUpdateImageVm: UserUpdateImageVm = {
            id: req.body.id,
            image: `${getUploadPath(req)}${req.file?.filename}`,
            updateDate: new Date()
        }
        let result: boolean | null = await updateExistUserImage(currentUserUpdateImageVm)
        if (result == true)
        {
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.get(
    `/by_phone_number/:phoneNumber?`,
    async (req, res) =>
    {
        let currentUser = await getUserByPhoneNumber(req.params.phoneNumber)
        if (currentUser != null)
        {
            return res.status(200).json(currentUser)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.get(
    `/by_email/:email?`,
    async (req, res) =>
    {
        let currentUser = await getUserByEmail(req.params.email)
        if (currentUser != null)
        {
            return res.status(200).json(currentUser)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)

userRouter.get(
    `/by_filter/:filter?`,
    async (req, res) =>
    {
        let userList = await getUserByFilter(req.params.filter)
        if (userList != null)
        {
            return res.status(200).json(userList)
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
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
            return res.status(404).json(getErrorMessageList())
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
            return res.status(200).json(getSuccessMessageList())
        }
        else
        {
            return res.status(404).json(getErrorMessageList())
        }
    }
)


