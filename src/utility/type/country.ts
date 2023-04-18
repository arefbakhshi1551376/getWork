export type Country = {
    title: string,
    createDate: Date,
    updateDate: Date
}

export type CountryAddVm = {
    title: string,
}

export type CountryUpdateVm = {
    id: string,
    title: string,
    updateDate: Date
}

export type CountryDeleteVm = {
    id: string,
}

