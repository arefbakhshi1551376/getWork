import {randomInt} from "crypto";

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
    let allowedCharacter = 'abcdefghijklmnopqrstuvwxyzA...BCDEFGHIJKLMNOPQRSTUVWXYZ'
    let finalResult = ''
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