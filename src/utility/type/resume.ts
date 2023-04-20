import {User} from "./user";
import {LanguageLevel} from "./languageLevel";
import {Degree} from "./degree";
import {CareerHistory} from "./careerHistory";
import {JobTime} from "./jobTime";
import {JobPlace} from "./jobPlace";
import {Category} from "./category";
import {Salary} from "./salary";
import {SkillLevel} from "./skillLevel";

export type Resume = {
    user: User,
    skillLevel: SkillLevel[],
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
    skillLevel: string[],
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
    skillLevel: string[],
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

