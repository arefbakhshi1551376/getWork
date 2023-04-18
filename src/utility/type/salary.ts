export type Salary = {
    isAgreed: boolean,
    amount: number,
    createDate: Date,
    updateDate: Date
}

export type SalaryAddVm = {
    isAgreed: boolean,
    amount: number,
}

export type SalaryUpdateVm = {
    id: string,
    isAgreed: boolean,
    amount: number,
    updateDate: Date
}

export type SalaryDeleteVm = {
    id: string,
}

