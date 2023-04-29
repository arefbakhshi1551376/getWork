import {Introduction} from "./introduction";
import {Address} from "./address";
import {User} from "./user";

export type Company = {
    introduction: Introduction,
    address: Address,
    email: string,
    phoneNumber: string,
    mainImage: string,
    albumImage: string[],
    establishYear: number,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type CompanyAddVm = {
    introduction: string,
    address: string,
    email: string,
    phoneNumber: string,
    mainImage: string,
    albumImage: string[],
    establishYear: number,
    creator: string,
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
    updater: string,
    updateDate: Date
}

export type CompanyGalleryUpdateVm = {
    id: string,
    albumImages: string[],
    updater: string,
    updateDate: Date
}


export type CompanyDeleteVm = {
    id: string,
}

