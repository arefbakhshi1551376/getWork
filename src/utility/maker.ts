import {randomInt} from "crypto";
import {addNewGender, getGenderByTitle} from "./coreMethod/gender";
import {GenderAddVm} from "./type/gender";
import {addNewStatus, getStatusById, getStatusByTitle} from "./coreMethod/status";
import {StatusAddVm} from "./type/status";
import {addNewSeniorityLevel, getSeniorityLevelByTitle} from "./coreMethod/seniorityLevel";
import {SeniorityLevelAddVm} from "./type/seniorityLevel";
import {currentAuthType} from "./constant";

export function nameMaker(numberOfCharacters: number = 10): string
{
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let finalResult = ''
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter

    }
    return finalResult
}

export function textMaker(numberOfCharacters: number = 30): string
{
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyz !!! ABCDEFGHIJKLMNOPQRSTUVWXYZ ...'
    let finalResult = ''
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter

    }
    return finalResult
}

export function emailMaker(numberOfCharacters: number = 10, afterEmail: string = 'yahoo.com'): string
{
    let finalResult = ''
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyzA...BCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter
    }
    finalResult = `${finalResult}@${afterEmail}`
    return finalResult
}

export function phoneNumberMaker(numberOfCharacters: number = 9): string
{
    let allowedCharacter = '123456789'
    let finalResult = '09'
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter
    }
    return finalResult
}

export async function defaultGenderMaker()
{
    console.log('We are ready to add 3 genders')
    let maleGender = await getGenderByTitle('Male')
    let feMaleGender = await getGenderByTitle('Female')
    let notDetectedGender = await getGenderByTitle('Not Detected')

    if (!maleGender)
    {
        console.log('Female is not exists')
        let genderAddMaleVm: GenderAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Male'
        }
        await addNewGender(genderAddMaleVm)
    }

    if (!feMaleGender)
    {
        console.log('Male is not exists')
        let genderAddFemaleVm: GenderAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Female'
        }
        await addNewGender(genderAddFemaleVm)
    }

    if (!notDetectedGender)
    {
        console.log('NotDetected is not exists')
        let genderAddNotDetectedVm: GenderAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Not Detected'
        }
        await addNewGender(genderAddNotDetectedVm)
    }
}

export async function defaultStatusMaker()
{
    let seenStatus = await getStatusByTitle('Seen')
    let verifyExpectedStatus = await getStatusByTitle('Verify Expected')
    let deniedStatus = await getStatusByTitle('Denied')

    if (!seenStatus)
    {
        let seenStatusAddVm: StatusAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Seen'
        }
        await addNewStatus(seenStatusAddVm)
    }

    if (!verifyExpectedStatus)
    {
        let verifyExpectedStatusAddVm: StatusAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Verify Expected'
        }
        await addNewStatus(verifyExpectedStatusAddVm)
    }

    if (!deniedStatus)
    {
        let deniedStatusAddVm: StatusAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Denied'
        }
        await addNewStatus(deniedStatusAddVm)
    }
}

export async function defaultSeniorityLevelMaker()
{
    let internSeniorityLevel = await getSeniorityLevelByTitle('Intern')
    let juniorSeniorityLevel = await getSeniorityLevelByTitle('Junior')
    let seniorSeniorityLevel = await getStatusByTitle('Senior')
    let midLevelSeniorityLevel = await getStatusByTitle('MidLevel')

    if (!internSeniorityLevel)
    {
        let internSeniorityLevelAddVm: SeniorityLevelAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Intern'
        }
        await addNewSeniorityLevel(internSeniorityLevelAddVm)
    }

    if (!juniorSeniorityLevel)
    {
        let juniorSeniorityLevelAddVm: SeniorityLevelAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Junior'
        }
        await addNewSeniorityLevel(juniorSeniorityLevelAddVm)
    }

    if (!seniorSeniorityLevel)
    {
        let seniorSeniorityLevelAddVm: SeniorityLevelAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'Senior'
        }
        await addNewSeniorityLevel(seniorSeniorityLevelAddVm)
    }

    if (!midLevelSeniorityLevel)
    {
        let midLevelSeniorityLevelAddVm: SeniorityLevelAddVm = {
            creator: currentAuthType.LOGIN_USER_ID,
            title: 'MidLevel'
        }
        await addNewSeniorityLevel(midLevelSeniorityLevelAddVm)
    }
}

export async function imageNameMaker(beforeName: string, numberOfCharacters: number = 50)
{
    let finalResult: string = `${beforeName}_`
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter
    }
    let nowDate = new Date()
    let nowDateAsString = `${nowDate.getSeconds()}${nowDate.getMinutes()}${nowDate.getHours()}${nowDate.getDay()}${nowDate.getMonth()}${nowDate.getFullYear()}`
    finalResult += nowDateAsString
    return finalResult
}


export async function verifyEmailOrMobileNumberTokenMaker(beforeName: string, numberOfCharacters: number = 50)
{
    let finalResult: string = `${beforeName}_`
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter
    }
    let nowDate = new Date()
    let nowDateAsString = `${nowDate.getSeconds()}${nowDate.getMinutes()}${nowDate.getHours()}${nowDate.getDay()}${nowDate.getMonth()}${nowDate.getFullYear()}`
    finalResult += nowDateAsString
    return finalResult
}

export async function userAuthUniqueTokenMaker(beforeName: string, numberOfCharacters: number = 50)
{
    let finalResult: string = `${beforeName}_`
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyz___ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomIndex: number;
    for (let i = 0; i < numberOfCharacters; i++)
    {
        randomIndex = randomInt(0, allowedCharacter.length - 1);
        let currentCharacter = allowedCharacter[randomIndex]
        finalResult += currentCharacter
    }
    let nowDate = new Date()
    let nowDateAsString = `${nowDate.getSeconds()}${nowDate.getMinutes()}${nowDate.getHours()}${nowDate.getDay()}${nowDate.getMonth()}${nowDate.getFullYear()}`
    finalResult += nowDateAsString
    return finalResult
}



