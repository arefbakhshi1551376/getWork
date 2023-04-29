import mongoose, {Schema} from "mongoose";

export const languageLevelSchema = new Schema({
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
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

languageLevelSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

languageLevelSchema.set('toJSON', {
    virtuals: true
})


export const LanguageLevel = mongoose.model(
    'LanguageLevel',
    languageLevelSchema
)