import {State} from "./state";
import {User} from "./user";

export type City = {
    title: string,
    state: State,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type CityAddVm = {
    title: string,
    state: string,
    creator: string,
}

export type CityUpdateVm = {
    id: string,
    title: string,
    state: string,
    updater: string,
    updateDate: Date
}

export type CityDeleteVm = {
    id: string,
}

