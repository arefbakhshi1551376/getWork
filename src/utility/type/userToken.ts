export type UserToken = {
    userId: string,
    uniqueCode: string,
    isWorkingYet: boolean,
    createDate: Date,
    updateDate: Date
}

export type UserTokenAddVm = {
    userId: string,
    uniqueCode: string,
}

export type UserTokenChangeIsWorkingYetVm = {
    userId: string,
    uniqueCode: string,
    updateDate: Date
}

export type UserTokenDeleteVm = {
    uniqueCode: string
}
