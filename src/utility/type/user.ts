import {Introduction} from "./introduction";
import {Gender} from "./gender";
import {City} from "./city";

export type User = {
    name: string,
    family: string,
    userName: string,
    email?: string,
    phoneNumber?: string,
    image?: string,
    password: string,
    isDeleted: boolean,
    isEnabled: boolean,
    isAdmin: boolean,
    isVerifiedEmail: boolean,
    isVerifiedPhoneNumber: boolean,
    ip?: string[],
    introduction?: Introduction,
    gender?: Gender,
    city?: City,
    lastLoginDate?: Date,
    creator?: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type UserUpdateVm = {
    id: string,
    name: string,
    family: string,
    userName: string,
    email?: string,
    phoneNumber?: string,
    ip?: string,
    introduction?: string,
    gender?: string,
    city?: string,
    updater?: string,
    updateDate: Date
}

export type UserUpdateImageVm = {
    id: string,
    image: string,
    updater?: string,
    updateDate: Date
}

export type UserVerifyEmailVm = {
    token: string,
    updateDate: Date
}

export type UserVerifyPhoneNumberVm = {
    token: string,
    updateDate: Date
}

export type UserUpdateVerifyEmailVm = {
    id: string,
    updateDate: Date
}

export type UserUpdateVerifyPhoneNumberVm = {
    id: string,
    updateDate: Date
}

export type UserLoginVm = {
    userName?: string,
    email?: string,
    phoneNumber?: string,
    password: string,
}

export type UserAddByAdminVm = {
    name: string,
    family: string,
    userName: string,
    email?: string,
    phoneNumber?: string,
    image?: string,
    password: string,
    isEnabled?: boolean,
    isAdmin?: boolean,
    isVerifiedEmail?: boolean,
    isVerifiedPhoneNumber?: boolean,
    introduction?: string,
    gender?: string,
    city?: string,
    creator: string
}

export type UserRegisterItselfVm = {
    name: string,
    family: string,
    userName: string,
    email?: string,
    phoneNumber?: string,
    image?: string,
    password: string,
    introduction?: string,
    gender?: string,
    city?: string
}

export type UserChangePasswordVm = {
    id: string,
    oldPassword: string,
    newPassword: string,
    repeatNewPassword: string,
    updater?: string,
    updateDate: Date
}

export type UserChangeEnableStateVm = {
    id: string,
    updater: string,
    updateDate: Date
}

export type UserChangeAdministrationStateVm = {
    id: string,
    updater: string,
    updateDate: Date
}

export type UserDeleteVm = {
    id: string,
}
