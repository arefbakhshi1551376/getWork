export type Language = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type LanguageAddVm = {
    title: string,
}

export type LanguageUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type LanguageDeleteVm = {
    id: string,
}
