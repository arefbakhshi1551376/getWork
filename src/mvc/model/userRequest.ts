import mongoose, {Schema} from "mongoose";

export const userRequestSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobAd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobAd',
        required: true
    },
    status: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            required: true
        }
    ],
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
})

userRequestSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

userRequestSchema.set('toJSON', {
    virtuals: true
})


export const UserRequest = mongoose.model(
    'UserRequest',
    userRequestSchema
)