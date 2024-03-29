import mongoose, {Schema} from "mongoose";

export const jobAdSchema = new Schema({
    introduction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Introduction',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    neededUser: {
        type: Number,
        required: true,
        default: 1
    },
    isWithInsurance: {
        type: Boolean,
        required: true,
        default: false
    },
    salary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salary',
        required: true
    },
    gender: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gender',
            required: true
        }
    ],
    jobTime: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobTime',
            required: true
        }
    ],
    jobPlace: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPlace',
            required: true
        }
    ],
    seniorityLevel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SeniorityLevel',
            required: false,
        }
    ],
    requiredWorkExperience: {
        type: Number,
        required: true,
        default: 0
    },
    isEnable: {
        type: Boolean,
        required: true,
        default: true
    },
    expireDate: {
        type: Date,
        required: true
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

jobAdSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

jobAdSchema.set('toJSON', {
    virtuals: true
})


export const JobAd = mongoose.model(
    'JobAd',
    jobAdSchema
)