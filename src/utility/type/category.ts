import {User} from "./user";

export type Category = {
    title: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type CategoryAddVm = {
    title: string,
    creator: string
}

export type CategoryUpdateVm = {
    id: string,
    title: string,
    updater: string,
    updateDate: Date
}

export type CategoryDeleteVm = {
    id: string,
}


