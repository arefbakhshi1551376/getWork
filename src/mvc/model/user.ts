import mongoose, {Schema} from "mongoose";

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    family: {
        type: String,
        required: true,
        default: ''
    },
    userName: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        required: true,
        default: ''
    },
    image: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    ip: [
        {
            type: String,
            required: true,
            default: ''
        }
    ],
    introduction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Introduction',
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    request: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request',
            required: true
        }
    ],
    lastLoginDate: {
        type: Date,
        required: true
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

userSchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true
})


export const User = mongoose.model(
    'User',
    userSchema
)