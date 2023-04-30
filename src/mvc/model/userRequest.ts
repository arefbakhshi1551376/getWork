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
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
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