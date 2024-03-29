export type VerifyUserPhoneNumber = {
    phoneNumber: string,
    token: string,
    createDate: Date,
    updateDate: Date
}

export type VerifyUserPhoneNumberAddVm = {
    phoneNumber: string,
    req: any
}

export type VerifyUserPhoneNumberUpdateVm = {
    token: string,
}

export type CountryDeleteVm = {
    id?: string,
    token?: string,
}