export type Status = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type StatusAddVm = {
    title: string,
}

export type StatusUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type StatusDeleteVm = {
    id: string,
}

