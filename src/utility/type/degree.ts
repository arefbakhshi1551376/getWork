import {User} from "./user";

export type Degree = {
    instituteName: string,
    trainingCourse: string,
    dateOfIssue: number,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type DegreeAddVm = {
    instituteName: string,
    trainingCourse: string,
    dateOfIssue: number,
    creator: string
}

export type DegreeUpdateVm = {
    id: string,
    instituteName: string,
    trainingCourse: string,
    dateOfIssue: number,
    updater: string,
    updateDate: Date
}

export type DegreeDeleteVm = {
    id: string,
}

