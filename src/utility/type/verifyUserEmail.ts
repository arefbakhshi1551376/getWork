export type VerifyUserEmail = {
    email: string,
    token: string,
    createDate: Date,
    updateDate: Date
}

export type VerifyUserEmailAddVm = {
    email: string,
}

export type VerifyUserEmailUpdateVm = {
    token: string,
}

export type CountryDeleteVm = {
    id?: string,
    token?: string,
}

