import mongoose, {Schema} from "mongoose";

export const addressSchema = new Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    restOfAddress: {
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

addressSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

addressSchema.set('toJSON', {
    virtuals: true
})


export const Address = mongoose.model(
    'Address',
    addressSchema
)