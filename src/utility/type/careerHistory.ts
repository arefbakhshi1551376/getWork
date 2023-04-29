import {User} from "./user";

export type CareerHistory = {
    workPlace: string,
    startWorkingYear: number,
    endWorkingYear: number,
    isWorkingYet: boolean,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type CareerHistoryAddVm = {
    workPlace: string,
    startWorkingYear: number,
    endWorkingYear: number,
    isWorkingYet: boolean,
    creator: string
}

export type CareerHistoryUpdateVm = {
    id: string,
    workPlace: string,
    startWorkingYear: number,
    endWorkingYear: number,
    isWorkingYet: boolean,
    updater: string,
    updateDate: Date
}

export type CareerHistoryDeleteVm = {
    id: string,
}

