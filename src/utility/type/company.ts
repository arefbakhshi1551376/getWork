import {Introduction} from "./introduction";
import {Address} from "./address";

export type Company = {
    introduction: Introduction,
    address: Address,
    email: string,
    phoneNumber: string,
    mainImage: string,
    albumImage: string[],
    establishYear: number,
    createDate: Date,
    updateDate: Date
}

export type CompanyAddVm = {
    introduction: string,
    address: string,
    email: string,
    phoneNumber: string,
    mainImage: string,
    albumImage: string[],
    establishYear: number
}

export type CompanyUpdateVm = {
    id: string,
    introduction: string,
    address: string,
    email: string,
    phoneNumber: string,
    mainImage: string,
    albumImage: string[],
    establishYear: number,
    updateDate: Date
}

export type CompanyGalleryUpdateVm = {
    id: string,
    albumImages: string[],
    updateDate: Date
}


export type CompanyDeleteVm = {
    id: string,
}

