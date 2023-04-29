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