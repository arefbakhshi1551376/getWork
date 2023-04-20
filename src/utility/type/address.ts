import {City} from "./city";

export type Address = {
    city: City,
    restOfAddress: string,
    createDate: Date,
    updateDate: Date
}

export type AddressAddVM = {
    city: string,
    restOfAddress: string
}

export type AddressUpdateVM = {
    id: string,
    city: string,
    restOfAddress: string,
    updateDate: Date
}

export type AddressDeleteVM = {
    id: string,
}


