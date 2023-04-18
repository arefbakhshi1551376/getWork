import {Language} from "./language";

export type LanguageLevel = {
    language: Language,
    level: number,
    createDate: Date,
    updateDate: Date
}

export type LanguageLevelAddVm = {
    language: string,
    level: number,
}

export type LanguageLevelUpdateVm = {
    id: string,
    language: string,
    level: number,
    updateDate: Date
}

export type LanguageLevelDeleteVm = {
    id: string,
}

