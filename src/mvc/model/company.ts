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
        type: String,
        required: true,
        default: ''
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