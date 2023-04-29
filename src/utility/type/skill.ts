import {User} from "./user";

export type Skill = {
    title: string,
    creator:User,
    createDate: Date,
    updater?:User,
    updateDate: Date
}

export type SkillAddVm = {
    title: string,
    creator:string
}

export type SkillUpdateVm = {
    id: string,
    title: string,
    updater:string,
    updateDate: Date
}

export type SkillDeleteVm = {
    id: string,
}

