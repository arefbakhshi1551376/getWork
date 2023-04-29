import {User} from "./user";
import {JobAd} from "./jobAd";
import {Status} from "./status";

export type Request = {
    user: User,
    jobAd: JobAd,
    status: Status[],
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type RequestAddVm = {
    user: string,
    jobAd: string,
}

export type RequestUpdateVm = {
    id: string,
    user: string,
    jobAd: string,
    status: string,
    updateDate: Date
}

export type RequestUpdateStatusVm = {
    id: string,
    status: string,
    updater: string,
    updateDate: Date
}

export type RequestDeleteVm = {
    id: string,
}
