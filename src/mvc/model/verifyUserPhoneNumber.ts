import mongoose, {Schema} from "mongoose";
import {verifyEmailOrMobileNumberTokenMaker} from "../../utility/maker";

export const verifyUserPhoneNumberSchema = new Schema({
    phoneNumber: {
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

verifyUserPhoneNumberSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

verifyUserPhoneNumberSchema.set('toJSON', {
    virtuals: true
})


export const VerifyUserPhoneNumber = mongoose.model(
    'VerifyUserPhoneNumber',
    verifyUserPhoneNumberSchema
)