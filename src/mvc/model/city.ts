import mongoose, {Schema} from "mongoose";

export const citySchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
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

citySchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

citySchema.set('toJSON', {
    virtuals: true
})


export const City = mongoose.model(
    'City',
    citySchema
)