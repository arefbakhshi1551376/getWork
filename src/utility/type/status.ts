import {User} from "./user";

export type Status = {
    title: string,
    creator:User,
    createDate: Date,
    updater:User,
    updateDate: Date
}

export type StatusAddVm = {
    title: string,
    creator:string
}

export type StatusUpdateVm = {
    id: string,
    title: string,
    updater:string,
    updateDate: Date
}

export type StatusDeleteVm = {
    id: string,
}

