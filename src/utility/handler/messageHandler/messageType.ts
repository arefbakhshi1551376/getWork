import {MessageStatus} from "./messageStatus";

export type messageType = {
    status: MessageStatus,
    text: string
}

export type messageList = {
    messageList: messageType[]
}