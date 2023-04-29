import {Skill} from "./skill";
import {User} from "./user";

export type SkillLevel = {
    skill: Skill,
    level: number,
    creator:User,
    createDate: Date,
    updater:User,
    updateDate: Date
}

export type SkillLevelAddVm = {
    skill: string,
    level: number,
    creator:string
}

export type SkillLevelUpdateVm = {
    id: string,
    skill: string,
    level: number,
    updater:string,
    updateDate: Date
}

export type SkillLevelDeleteVm = {
    id: string,
}