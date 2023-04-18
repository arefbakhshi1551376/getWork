export type CareerHistory = {
    workPlace: string,
    startWorkingYear: number,
    endWorkingYear: number,
    isWorkingYet: boolean,
    createDate: Date,
    updateDate: Date
}

export type CareerHistoryAddVm = {
    workPlace: string,
    startWorkingYear: number,
    endWorkingYear: number,
    isWorkingYet: boolean
}

export type CareerHistoryUpdateVm = {
    id: string,
    workPlace: string,
    startWorkingYear: number,
    endWorkingYear: number,
    isWorkingYet: boolean,
    updateDate: Date
}

export type CareerHistoryDeleteVm = {
    id: string,
}

