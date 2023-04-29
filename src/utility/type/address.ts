import {City} from "./city";
import {User} from "./user";

export type Address = {
    city: City,
    restOfAddress: string,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type AddressAddVM = {
    city: string,
    restOfAddress: string,
    creator: string,
}

export type AddressUpdateVM = {
    id: string,
    city: string,
    restOfAddress: string,
    updater: string,
    updateDate: Date
}

export type AddressDeleteVM = {
    id: string,
}


