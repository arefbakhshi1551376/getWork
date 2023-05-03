import mongoose, {Schema} from "mongoose";
import {verifyEmailOrMobileNumberTokenMaker} from "../../utility/maker";

export const verifyUserEmailSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        default: ''
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