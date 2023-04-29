import {Language} from "./language";
import {User} from "./user";

export type LanguageLevel = {
    language: Language,
    level: number,
    creator: User,
    createDate: Date,
    updater?: User,
    updateDate: Date
}

export type LanguageLevelAddVm = {
    language: string,
    level: number,
    creator: string
}

export type LanguageLevelUpdateVm = {
    id: string,
    language: string,
    level: number,
    updater: string,
    updateDate: Date
}

export type LanguageLevelDeleteVm = {
    id: string,
}

