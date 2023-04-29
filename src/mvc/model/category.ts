import mongoose, {Schema} from "mongoose";

export const categorySchema = new Schema({
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

categorySchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

categorySchema.set('toJSON', {
    virtuals: true
})


export const Category = mongoose.model(
    'Category',
    categorySchema
)