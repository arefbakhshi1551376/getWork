import {modelsName, whatHappened} from "./constant";

export function showMessageForEveryThing(
    res: any,
    statusCode: number,
    modelName: string,
    happen: string
)
{
    if (happen == whatHappened.Found)
    {
        return res.status(statusCode).json({
            Message: `No ${modelsName.toString()} found!`
        })
    }
    return res.status(statusCode).json({
        Message: `${modelsName.toString()} ${whatHappened.toString()}!!!`
    })
}