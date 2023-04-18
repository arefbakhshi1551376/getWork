import mongoose, {Schema} from "mongoose";

export const jobTimeSchema = new Schema({
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

jobTimeSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

jobTimeSchema.set('toJSON', {
    virtuals: true
})


export const JobTime = mongoose.model(
    'JobTime',
    jobTimeSchema
)