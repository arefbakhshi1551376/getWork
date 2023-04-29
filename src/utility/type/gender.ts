import {User} from "./user";

export type Gender = {
    title: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type GenderAddVm = {
    title: string,
    creator: string
}

export type GenderUpdateVm = {
    id: string,
    title: string,
    updater: string,
    updateDate: Date
}

export type GenderDeleteVm = {
    id: string,
}

