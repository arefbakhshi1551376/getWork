import mongoose, {Schema} from "mongoose";

export const skillLevelSchema = new Schema({
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
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

skillLevelSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

skillLevelSchema.set('toJSON', {
    virtuals: true
})


export const SkillLevel = mongoose.model(
    'SkillLevel',
    skillLevelSchema
)