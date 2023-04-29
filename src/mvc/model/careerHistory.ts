import mongoose, {Schema} from "mongoose";

export const careerHistorySchema = new Schema({
    workPlace: {
        type: String,
        required: true,
        default: ''
    },
    startWorkingYear: {
        type: Number,
        required: true
    },
    endWorkingYear: {
        type: Number,
        required: true,
        default: Date.now
    },
    isWorkingYet: {
        type: Boolean,
        required: true,
        default: false
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

careerHistorySchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

careerHistorySchema.set('toJSON', {
    virtuals: true
})


export const CareerHistory = mongoose.model(
    'CareerHistory',
    careerHistorySchema
)