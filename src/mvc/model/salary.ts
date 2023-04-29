import mongoose, {Schema} from "mongoose";

export const salarySchema = new Schema({
    isAgreed: {
        type: Boolean,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: true,
        default: 0
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

salarySchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

salarySchema.set('toJSON', {
    virtuals: true
})


export const Salary = mongoose.model(
    'Salary',
    salarySchema
)