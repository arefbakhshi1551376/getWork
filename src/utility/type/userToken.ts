export type UserToken = {
    uniqueCode: string,
    isWorkingYet: boolean,
    createDate: Date,
    updateDate: Date
}

export type UserTokenAddVm = {
    uniqueCode: string,
}

export type UserTokenChangeIsWorkingYetVm = {
    uniqueCode: string,
    updateDate: Date
}

export type UserTokenDeleteVm = {
    uniqueCode: string
}
