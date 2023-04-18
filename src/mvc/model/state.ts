import mongoose, {Schema} from "mongoose";

export const stateSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
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

stateSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

stateSchema.set('toJSON', {
    virtuals: true
})


export const State = mongoose.model(
    'State',
    stateSchema
)