import {User} from "./user";
import {Skill} from "./skill";
import {LanguageLevel} from "./languageLevel";
import {Degree} from "./degree";
import {CareerHistory} from "./careerHistory";
import {JobTime} from "./jobTime";
import {JobPlace} from "./jobPlace";
import {Category} from "./category";
import {Salary} from "./salary";

export type Resume = {
    user: User,
    skill: Skill[],
    languageLevel: LanguageLevel[],
    degree: Degree[],
    careerHistory: CareerHistory[],
    link: string[],
    jobTime: JobTime[],
    jobPlace: JobPlace[],
    favoriteJob: Category[],
    expectedSalary: Salary,
    isShowToOthers: boolean,
    createDate: Date,
    updateDate: Date
}

export type ResumeAddVm = {
    user: string,
    skill: string[],
    languageLevel: string[],
    degree: string[],
    careerHistory: string[],
    link: string[],
    jobTime: string[],
    jobPlace: string[],
    favoriteJob: string[],
    expectedSalary: string,
    isShowToOthers: boolean,
}

export type ResumeUpdateVm = {
    id: string,
    user: string,
    skill: string[],
    languageLevel: string[],
    degree: string[],
    careerHistory: string[],
    link: string[],
    jobTime: string[],
    jobPlace: string[],
    favoriteJob: string[],
    expectedSalary: string,
    isShowToOthers: boolean,
    updateDate: Date
}

export type ResumeDeleteVm = {
    id: string,
}

