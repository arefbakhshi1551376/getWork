export type JobTime = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type JobTimeAddVm = {
    title: string,
}

export type JobTimeUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type JobTimeDeleteVm = {
    id: string,
}
