import {User} from "./user";

export type Country = {
    title: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type CountryAddVm = {
    title: string,
    creator: string
}

export type CountryUpdateVm = {
    id: string,
    title: string,
    updater: string,
    updateDate: Date
}

export type CountryDeleteVm = {
    id: string,
}

