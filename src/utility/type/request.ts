import {User} from "./user";
import {JobAd} from "./jobAd";
import {Status} from "./status";

export type Request = {
    user: User,
    jobAd: JobAd,
    status: Status[],
    createDate: Date,
    updateDate: Date
}

export type RequestAddVm = {
    user: string,
    jobAd: string,
    status: string[],
}

export type RequestUpdateVm = {
    id: string,
    user: string,
    jobAd: string,
    status: string,
    updateDate: Date
}

export type RequestDeleteVm = {
    id: string,
}
