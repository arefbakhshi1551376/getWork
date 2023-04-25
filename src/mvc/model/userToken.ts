import mongoose, {Schema} from "mongoose";
import {userAuthUniqueTokenMaker} from "../../utility/maker";

export const userTokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    uniqueCode: {
        type: String,
        required: true,
    },
    isWorkingYet: {
        type: Boolean,
        required: true,
        default: true
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

userTokenSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

userTokenSchema.set('toJSON', {
    virtuals: true
})


export const UserToken = mongoose.model(
    'UserToken',
    userTokenSchema
)