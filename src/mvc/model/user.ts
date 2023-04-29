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
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
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
    isEnabled: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerifiedEmail: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerifiedPhoneNumber: {
        type: Boolean,
        required: true,
        default: false
    },
    ip: [
        {
            type: String,
            required: false
        }
    ],
    introduction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Introduction',
        required: false
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: false
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: false
    },
    lastLoginDate: {
        type: Date,
        required: false
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
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