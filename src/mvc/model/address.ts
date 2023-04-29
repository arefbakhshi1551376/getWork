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