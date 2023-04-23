import {randomInt} from "crypto";
import {addNewGender, getGenderByTitle} from "./coreMethod/gender";
import {GenderAddVm} from "./type/gender";
import {addNewStatus, getStatusById, getStatusByTitle} from "./coreMethod/status";
import {StatusAddVm} from "./type/status";

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
            title: 'Male'
        }
        await addNewGender(genderAddMaleVm)
    }

    if (!feMaleGender)
    {
        console.log('Male is not exists')
        let genderAddFemaleVm: GenderAddVm = {
            title: 'Female'
        }
        await addNewGender(genderAddFemaleVm)
    }

    if (!notDetectedGender)
    {
        console.log('NotDetected is not exists')
        let genderAddNotDetectedVm: GenderAddVm = {
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
            title: 'Male'
        }
        await addNewStatus(seenStatusAddVm)
    }

    if (!verifyExpectedStatus)
    {
        let verifyExpectedStatusAddVm: StatusAddVm = {
            title: 'Verify Expected'
        }
        await addNewStatus(verifyExpectedStatusAddVm)
    }

    if (!deniedStatus)
    {
        let deniedStatusAddVm: StatusAddVm = {
            title: 'Denied'
        }
        await addNewStatus(deniedStatusAddVm)
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

