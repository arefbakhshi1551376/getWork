import {Country} from "./country";
import {User} from "./user";

export type State = {
    title: string,
    country: Country,
    creator:User,
    createDate: Date,
    updater:User,
    updateDate: Date
}

export type StateAddVm = {
    title: string,
    country: string,
    creator:string
}

export type StateUpdateVm = {
    id: string,
    title: string,
    country: string,
    updater:string,
    updateDate: Date
}

export type StateDeleteVm = {
    id: string,
}

