import {Introduction} from "./introduction";
import {Company} from "./company";
import {Salary} from "./salary";
import {Gender} from "./gender";
import {JobTime} from "./jobTime";
import {JobPlace} from "./jobPlace";
import {SeniorityLevel} from "./seniorityLevel";
import {User} from "./user";

export type JobAd = {
    introduction: Introduction,
    company: Company,
    neededUser: number,
    isWithInsurance: boolean,
    salary: Salary,
    gender: Gender[],
    jobTime: JobTime[],
    jobPlace: JobPlace[],
    seniorityLevel: SeniorityLevel[],
    requiredWorkExperience: number,
    isEnable: boolean,
    expireDate: Date,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type JobAdAddVm = {
    introduction: string,
    company: string,
    neededUser: number,
    isWithInsurance: boolean,
    salary: string,
    gender: string[],
    jobTime: string[],
    jobPlace: string[],
    seniorityLevel: string[],
    requiredWorkExperience: number,
    isEnable: boolean,
    creator: string,
}

export type JobAdUpdateVm = {
    id: string,
    introduction: string,
    company: string,
    neededUser: number,
    isWithInsurance: boolean,
    salary: string,
    gender: string[],
    jobTime: string[],
    jobPlace: string[],
    seniorityLevel: string[],
    requiredWorkExperience: number,
    isEnable: boolean,
    updater: string,
    updateDate: Date
}

export type JobAdDeleteVm = {
    id: string,
}

