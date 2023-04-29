import {User} from "./user";

export type SeniorityLevel = {
    title: string,
    creator:User,
    createDate: Date,
    updater:User,
    updateDate: Date
}

export type SeniorityLevelAddVm = {
    title: string,
    creator:string
}

export type SeniorityLevelUpdateVm = {
    id: string,
    title: string,
    updater:string,
    updateDate: Date
}

export type SeniorityLevelDeleteVm = {
    id: string,
}

