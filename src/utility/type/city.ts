import {State} from "./state";

export type City = {
    title: string,
    state: State,
    createDate: Date,
    updateDate: Date
}

export type CityAddVm = {
    title: string,
    state: string
}

export type CityUpdateVm = {
    id: string,
    title: string,
    state: string,
    updateDate: Date
}

export type CityDeleteVm = {
    id: string,
}

