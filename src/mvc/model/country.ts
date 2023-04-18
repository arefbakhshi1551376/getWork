import mongoose, {Schema} from "mongoose";

export const countrySchema = new Schema({
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

countrySchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

countrySchema.set('toJSON', {
    virtuals: true
})


export const Country = mongoose.model(
    'Country',
    countrySchema
)