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