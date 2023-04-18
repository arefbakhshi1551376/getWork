export type SeniorityLevel = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type SeniorityLevelAddVm = {
    title: string,
}

export type SeniorityLevelUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type SeniorityLevelDeleteVm = {
    id: string,
}

