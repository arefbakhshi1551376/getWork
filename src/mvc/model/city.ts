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
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
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