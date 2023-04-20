import mongoose from "mongoose";

export function idIsNotValid(id: string): boolean
{
    return !mongoose.isValidObjectId(id);
}