import mongoose, {Schema} from "mongoose";
import {verifyTokenMaker} from "../../utility/maker";

export const verifyUserEmailSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        default: verifyTokenMaker('email_')
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})

verifyUserEmailSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

verifyUserEmailSchema.set('toJSON', {
    virtuals: true
})


export const VerifyUserEmail = mongoose.model(
    'VerifyUserEmail',
    verifyUserEmailSchema
)