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
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
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