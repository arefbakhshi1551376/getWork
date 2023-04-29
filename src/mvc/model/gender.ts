import mongoose, {Schema} from "mongoose";

export const genderSchema = new Schema({
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

genderSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

genderSchema.set('toJSON', {
    virtuals: true
})


export const Gender = mongoose.model(
    'Gender',
    genderSchema
)