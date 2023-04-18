import mongoose, {Schema} from "mongoose";

export const languageSchema = new Schema({
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

languageSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

languageSchema.set('toJSON', {
    virtuals: true
})


export const Language = mongoose.model(
    'Language',
    languageSchema
)