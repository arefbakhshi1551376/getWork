export type JobPlace = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type JobPlaceAddVm = {
    title: string,
}

export type JobPlaceUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type JobPlaceDeleteVm = {
    id: string,
}
