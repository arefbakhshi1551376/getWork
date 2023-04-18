import {Introduction} from "./introduction";
import {Company} from "./company";
import {Salary} from "./salary";
import {Gender} from "./gender";
import {JobTime} from "./jobTime";
import {JobPlace} from "./jobPlace";
import {SeniorityLevel} from "./seniorityLevel";
import {Request} from "./request";

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
    request: Request[],
    requiredWorkExperience: number,
    isEnable: boolean,
    expireDate: Date,
    createDate: Date,
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
    request: string[],
    requiredWorkExperience: number,
    isEnable: boolean,
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
    request: string[],
    requiredWorkExperience: number,
    isEnable: boolean,
    updateDate: Date
}

export type JobAdDeleteVm = {
    id: string,
}

