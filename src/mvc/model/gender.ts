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
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
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