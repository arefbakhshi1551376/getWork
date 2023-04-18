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
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
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