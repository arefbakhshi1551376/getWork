import mongoose, {Schema} from "mongoose";

export const jobPlaceSchema = new Schema({
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

jobPlaceSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

jobPlaceSchema.set('toJSON', {
    virtuals: true
})


export const JobPlace = mongoose.model(
    'JobPlace',
    jobPlaceSchema
)