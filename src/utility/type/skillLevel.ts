import {Skill} from "./skill";

export type SkillLevel = {
    skill: Skill,
    level: number,
    createDate: Date,
    updateDate: Date
}

export type SkillLevelAddVm = {
    skill: string,
    level: number,
}

export type SkillLevelUpdateVm = {
    id: string,
    skill: string,
    level: number,
    updateDate: Date
}

export type SkillLevelDeleteVm = {
    id: string,
}