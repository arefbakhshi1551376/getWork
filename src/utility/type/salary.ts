import {User} from "./user";

export type Salary = {
    isAgreed: boolean,
    amount: number,
    creator: User,
    createDate: Date,
    updater: User,
    updateDate: Date
}

export type SalaryAddVm = {
    isAgreed: boolean,
    amount: number,
    creator: string
}

export type SalaryUpdateVm = {
    id: string,
    isAgreed: boolean,
    amount: number,
    updater: string,
    updateDate: Date
}

export type SalaryDeleteVm = {
    id: string,
}

