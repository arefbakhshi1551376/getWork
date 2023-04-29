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