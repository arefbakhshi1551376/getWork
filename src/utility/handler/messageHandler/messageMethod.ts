import {currentMessageList} from "../../constant";
import {MessageStatus} from "./messageStatus";
import {messageType} from "./messageType";

export function addNewErrorMessage(message: string)
{
    currentMessageList.messageList.push({
        status: MessageStatus.ErrorMessage,
        text: message
    })
}

export function addNewSuccessMessage(message: string)
{
    currentMessageList.messageList.push({
        status: MessageStatus.SuccessMessage,
        text: message
    })
}

export function getErrorMessageList(): string[]
{
    return currentMessageList.messageList.filter(value =>
    {
        return value.status == MessageStatus.ErrorMessage
    }).map(value => {
        return value.text
    })
}

export function getSuccessMessageList(): string[]
{
    return currentMessageList.messageList.filter(value =>
    {
        return value.status == MessageStatus.SuccessMessage
    }).map(value => {
        return value.text
    })
}

export function emptyMessageList()
{
    currentMessageList.messageList = []
}
