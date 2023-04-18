import mongoose, {Schema} from "mongoose";

export const introductionSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    description: {
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

introductionSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

introductionSchema.set('toJSON', {
    virtuals: true
})


export const Introduction = mongoose.model(
    'Introduction',
    introductionSchema
)