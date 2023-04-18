export type Gender = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type GenderAddVm = {
    title: string,
}

export type GenderUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type GenderDeleteVm = {
    id: string,
}

