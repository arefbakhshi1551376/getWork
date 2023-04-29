import mongoose, {Schema} from "mongoose";

export const statusSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
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

statusSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

statusSchema.set('toJSON', {
    virtuals: true
})


export const Status = mongoose.model(
    'Status',
    statusSchema
)