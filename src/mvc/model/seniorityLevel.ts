import mongoose, {Schema} from "mongoose";

export const seniorityLevelSchema = new Schema({
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

seniorityLevelSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

seniorityLevelSchema.set('toJSON', {
    virtuals: true
})


export const SeniorityLevel = mongoose.model(
    'SeniorityLevel',
    seniorityLevelSchema
)