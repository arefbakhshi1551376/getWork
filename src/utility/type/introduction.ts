import {User} from "./user";

export type Introduction = {
    title: string,
    description: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type IntroductionAddVm = {
    title: string,
    description: string,
    creator: string
}

export type IntroductionUpdateVm = {
    id: string,
    title: string,
    description: string,
    updater: string,
    updateDate: Date
}

export type IntroductionDeleteVm = {
    id: string,
}
