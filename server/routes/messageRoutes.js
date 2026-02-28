import express from 'express'
import Message from '../models/Message.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Send a message
router.post('/', protect, async (req, res) => {
    try {
        const { receiverId, content } = req.body

        const newMessage = new Message({
            sender: req.user.id,
            receiver: receiverId,
            content
        })

        const savedMessage = await newMessage.save()

        // Create notification for receiver
        try {
            await Notification.create({
                recipient: receiverId,
                sender: req.user.id,
                type: 'message',
                message: 'sent you a new message'
            })
        } catch (error) {
            console.error('Failed to create notification', error)
        }

        res.status(201).json(savedMessage)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Get conversation with a specific user
router.get('/:userId', protect, async (req, res) => {
    try {
        const otherUserId = req.params.userId
        const currentUserId = req.user.id

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        }).sort({ createdAt: 1 })

        res.json(messages)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Get list of conversations (users messaged with)
router.get('/conversations/list', protect, async (req, res) => {
    try {
        const currentUserId = req.user.id

        // Find all messages where current user is sender or receiver
        const messages = await Message.find({
            $or: [{ sender: currentUserId }, { receiver: currentUserId }]
        }).sort({ createdAt: -1 })

        // Extract unique user IDs interact with
        const userIds = new Set()
        messages.forEach(msg => {
            const otherId = msg.sender.toString() === currentUserId
                ? msg.receiver.toString()
                : msg.sender.toString()
            userIds.add(otherId)
        })

        // Fetch user details for these IDs
        const users = await User.find({ _id: { $in: Array.from(userIds) } })
            .select('name avatar headline')

        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

export default router
