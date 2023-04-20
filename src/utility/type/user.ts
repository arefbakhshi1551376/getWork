import {Introduction} from "./introduction";
import {Gender} from "./gender";
import {City} from "./city";
import {Request} from "./request";

export type User = {
    name: string,
    family: string,
    userName: string,
    email: string,
    phoneNumber: string,
    image: string,
    password: string,
    isDeleted:boolean,
    ip: string[],
    introduction: Introduction,
    gender: Gender,
    city: City,
    request: Request[],
    lastLoginDate: Date,
    createDate: Date,
    updateDate: Date
}

export type UserAddVm = {
    name: string,
    family: string,
    userName: string,
    email: string,
    phoneNumber: string,
    image: string,
    password: string,
    ip: string,
    gender: string,
    city: string,
    lastLoginDate: Date
}

export type UserUpdateVm = {
    id: string,
    name: string,
    family: string,
    userName: string,
    email: string,
    phoneNumber: string,
    image: string,
    password: string,
    ip: string,
    introduction: string,
    gender: string,
    city: string,
    lastLoginDate: Date
    updateDate: Date
}

export type UserDeleteVm = {
    id: string,
}
