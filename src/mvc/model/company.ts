import mongoose, {Schema} from "mongoose";

export const companySchema = new Schema({
    introduction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Introduction',
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
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
    mainImage: {
        type: String,
        required: true,
        default: ''
    },
    albumImages: [
        {
            type: String,
            required: true,
            default: ''
        }
    ],
    establishYear: {
        type: Number,
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

companySchema.virtual('id').get(function ()
{
    return this._id.toHexString()
})

companySchema.set('toJSON', {
    virtuals: true
})


export const Company = mongoose.model(
    'Company',
    companySchema
)