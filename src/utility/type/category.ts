export type Category = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type CategoryAddVm = {
    title: string,
}

export type CategoryUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type CategoryDeleteVm = {
    id: string,
}


