import mongoose, {Schema} from "mongoose";

export const skillSchema = new Schema({
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

skillSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

skillSchema.set('toJSON', {
    virtuals: true
})


export const Skill = mongoose.model(
    'Skill',
    skillSchema
)