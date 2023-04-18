export type Skill = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type SkillAddVm = {
    title: string,
}

export type SkillUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type SkillDeleteVm = {
    id: string,
}

