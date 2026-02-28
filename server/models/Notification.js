import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['connection_request', 'connection_accepted', 'message', 'like', 'comment', 'view'],
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    message: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('Notification', NotificationSchema)
