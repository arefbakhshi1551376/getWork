import mongoose, {Schema} from "mongoose";

export const resumeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skill: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
            required: true
        }
    ],
    languageLevel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LanguageLevel',
            required: true
        }
    ],
    degree: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Degree',
            required: true
        }
    ],
    careerHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CareerHistory',
            required: true
        }
    ],
    link: [
        {
            type: String,
            required: true,
            default: ''
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
    favoriteJob: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    expectedSalary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salary',
        required: true
    },
    isShowToOthers: {
        type: Boolean,
        required: true,
        default: false
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

resumeSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

resumeSchema.set('toJSON', {
    virtuals: true
})


export const Resume = mongoose.model(
    'Resume',
    resumeSchema
)