import express from 'express'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get notifications for current user
router.get('/', protect, async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .populate('sender', 'name avatar headline')
            .populate('post', 'content')
            .sort({ createdAt: -1 })
            .limit(20)

        res.json(notifications)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Mark notification as read
router.put('/:id/read', protect, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
        if (!notification) return res.status(404).json({ message: 'Notification not found' })

        if (notification.recipient.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        notification.read = true
        await notification.save()
        res.json(notification)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Mark all as read
router.put('/mark-all-read', protect, async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, read: false },
            { $set: { read: true } }
        )
        res.json({ message: 'All notifications marked as read' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default router
