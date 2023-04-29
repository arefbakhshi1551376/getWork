import {User} from "./user";

export type JobTime = {
    title: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type JobTimeAddVm = {
    title: string,
    creator: string
}

export type JobTimeUpdateVm = {
    id: string,
    title: string,
    updater: string,
    updateDate: Date
}

export type JobTimeDeleteVm = {
    id: string,
}
