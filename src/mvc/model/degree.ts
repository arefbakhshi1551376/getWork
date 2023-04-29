import mongoose, {Schema} from "mongoose";

export const degreeSchema = new Schema({
    instituteName: {
        type: String,
        required: true,
        default: ''
    },
    trainingCourse: {
        type: String,
        required: true,
        default: ''
    },
    dateOfIssue: {
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

degreeSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

degreeSchema.set('toJSON', {
    virtuals: true
})

export const Degree = mongoose.model(
    'Degree',
    degreeSchema
)