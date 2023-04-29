import {User} from "./user";

export type Language = {
    title: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type LanguageAddVm = {
    title: string,
    creator: string
}

export type LanguageUpdateVm = {
    id: string,
    title: string,
    updater: string,
    updateDate: Date
}

export type LanguageDeleteVm = {
    id: string,
}
