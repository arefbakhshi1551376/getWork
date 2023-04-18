export type Introduction = {
    title: string,
    description: string,
    createDate: Date,
    updateDate: Date
}

export type IntroductionAddVm = {
    title: string,
    description: string,
}

export type IntroductionUpdateVm = {
    id: string,
    title: string,
    description: string,
    updateDate: Date
}

export type IntroductionDeleteVm = {
    id: string,
}
