import {Country} from "./country";

export type State = {
    title: string,
    country: Country,
    createDate: Date,
    updateDate: Date
}

export type StateAddVm = {
    title: string,
    country: string,
}

export type StateUpdateVm = {
    id: string,
    title: string,
    country: string,
    updateDate: Date
}

export type StateDeleteVm = {
    id: string,
}

