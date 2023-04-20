import mongoose, {Schema} from "mongoose";

export const resumeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillLevel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillLevel',
            required: false
        }
    ],
    languageLevel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LanguageLevel',
            required: false
        }
    ],
    degree: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Degree',
            required: false
        }
    ],
    careerHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CareerHistory',
            required: false
        }
    ],
    link: [
        {
            type: String,
            required: false,
            default: []
        }
    ],
    jobTime: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobTime',
            required: false
        }
    ],
    jobPlace: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPlace',
            required: false
        }
    ],
    favoriteJob: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: false,
        }
    ],
    expectedSalary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salary',
        required: false
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