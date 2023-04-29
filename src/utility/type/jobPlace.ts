import {User} from "./user";

export type JobPlace = {
    title: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type JobPlaceAddVm = {
    title: string,
    creator: string
}

export type JobPlaceUpdateVm = {
    id: string,
    title: string,
    updater: string,
    updateDate: Date
}

export type JobPlaceDeleteVm = {
    id: string,
}
