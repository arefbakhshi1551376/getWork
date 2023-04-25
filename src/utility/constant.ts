import {authType} from "./handler/authHandler/authType";
import {messageList} from "./handler/messageHandler/messageType";

export const BEFORE_LINK_V1 = '/api/v1'
export const SECRET_JWT = 'secret'
export const currentAuthType: authType = {
    IS_USER_ADMIN: false,
    IS_USER_LOGIN: true,
    LOGIN_USER_TOKEN_UNIQUE_CODE: "",
    LOGIN_USER_ID: ''
}
export const currentMessageList: messageList = {
    messageList: []
}

export enum modelsName
{
    Address = 'Address',
    CareerHistory = 'Career History',
    Category = 'Category',
    City = 'City',
    Company = 'Company',
    Country = 'Country',
    Degree = 'Degree',
    Gender = 'Gender',
    Introduction = 'Introduction',
    JobAd = 'Job Ad',
    JobPlace = 'Job Place',
    JobTime = 'Job Time',
    Language = 'Language',
    LanguageLevel = 'Language Level',
    Request = 'Request',
    Resume = 'Resume',
    Salary = 'Salary',
    SeniorityLevel = 'Seniority Level',
    Skill = 'Skill',
    SkillLevel = 'SkillLevel',
    State = 'State',
    Status = 'Status',
    User = 'User',
}

export enum whatHappened
{
    Added = 'Added',
    Updated = 'Updated',
    Edited = 'Edited',
    Deleted = 'Deleted',
    Missed = 'Missed',
    Found = 'Found',
}

export function getProtocolAndHost(req: any): string
{
    let finalResult: string = ''
    let protocol = req.protocol
    let host = req.get('host')
    finalResult = `${protocol}://${host}`
    return finalResult
}

export function getUploadPath(req: any): string
{
    return `${getProtocolAndHost(req)}/src/public/upload/`
}

export function getUploadPathArray(req: any): string
{
    return `${getProtocolAndHost(req)}/src/public/upload/`
}

export const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

export function getExtensionOfImage(mimetype: any)
{
    switch (mimetype)
    {
        case 'image/png':
        {
            return 'png'
        }
        case 'image/jpeg':
        {
            return 'jpeg'
        }
        case 'image/jpg':
        {
            return 'jpg'
        }
    }
}
