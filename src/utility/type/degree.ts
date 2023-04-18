export type Degree = {
    instituteName: string,
    trainingCourse: string,
    dateOfIssue: number,
    createDate: Date,
    updateDate: Date
}

export type DegreeAddVm = {
    instituteName: string,
    trainingCourse: string,
    dateOfIssue: number
}

export type DegreeUpdateVm = {
    id: string,
    instituteName: string,
    trainingCourse: string,
    dateOfIssue: number,
    updateDate: Date
}

export type DegreeDeleteVm = {
    id: string,
}

