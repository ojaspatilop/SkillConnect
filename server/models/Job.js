import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String, // Full-time, Part-time, Contract, etc.
        default: 'Full-time'
    },
    description: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }],
    salaryRange: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            default: 'applied'
        },
        appliedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true })

export default mongoose.model('Job', JobSchema)
