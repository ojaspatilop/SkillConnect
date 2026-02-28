import express from 'express'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get all connections for the current user
router.get('/', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('connections', 'name headline avatar')
        res.json(user.connections)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Get pending connection requests
router.get('/requests', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('connectionRequests.sender', 'name headline avatar')

        const pendingRequests = user.connectionRequests.filter(req => req.status === 'pending')
        res.json(pendingRequests)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Get suggestions (users not connected to)
router.get('/suggestions', protect, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id)
        const connectedIds = currentUser.connections.map(c => c.toString())
        const pendingIds = currentUser.connectionRequests.map(r => r.sender.toString())

        // Exclude self, existing connections, and pending requests
        const excludeIds = [req.user.id, ...connectedIds, ...pendingIds]

        const suggestions = await User.find({ _id: { $nin: excludeIds } })
            .select('name headline avatar')
            .limit(10)

        res.json(suggestions)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Send a connection request
router.post('/request/:userId', protect, async (req, res) => {
    try {
        const targetUserId = req.params.userId
        const senderId = req.user.id

        if (targetUserId === senderId) {
            return res.status(400).json({ message: 'Cannot connect to self' })
        }

        const targetUser = await User.findById(targetUserId)
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Check if already connected or request pending
        const isClientConnected = targetUser.connections.includes(senderId)
        const isRequestPending = targetUser.connectionRequests.some(r => r.sender.toString() === senderId && r.status === 'pending')

        if (isClientConnected || isRequestPending) {
            return res.status(400).json({ message: 'Already connected or request pending' })
        }

        targetUser.connectionRequests.push({ sender: senderId, status: 'pending' })
        await targetUser.save()

        res.json({ message: 'Connection request sent' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Accept a connection request
router.put('/accept/:senderId', protect, async (req, res) => {
    try {
        const senderId = req.params.senderId
        const receiverId = req.user.id

        const receiver = await User.findById(receiverId)
        const sender = await User.findById(senderId)

        if (!receiver || !sender) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Find request
        const requestIndex = receiver.connectionRequests.findIndex(
            r => r.sender.toString() === senderId && r.status === 'pending'
        )

        if (requestIndex === -1) {
            return res.status(400).json({ message: 'No pending request found' })
        }

        // Update request status
        receiver.connectionRequests[requestIndex].status = 'accepted'

        // Add to connections for BOTH users
        receiver.connections.push(senderId)
        sender.connections.push(receiverId)

        await receiver.save()
        await sender.save()

        // Create Notification for sender (that their request was accepted)
        await Notification.create({
            recipient: senderId,
            sender: receiverId,
            type: 'connection_accepted',
            message: 'accepted your connection request'
        })

        res.json({ message: 'Connection accepted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
})

// Ignore/Reject a connection request
router.put('/ignore/:senderId', protect, async (req, res) => {
    try {
        const senderId = req.params.senderId
        const receiverId = req.user.id

        const receiver = await User.findById(receiverId)

        const requestIndex = receiver.connectionRequests.findIndex(
            r => r.sender.toString() === senderId && r.status === 'pending'
        )

        if (requestIndex === -1) {
            return res.status(400).json({ message: 'No pending request found' })
        }

        // Remove the request or mark as rejected
        receiver.connectionRequests.splice(requestIndex, 1)
        await receiver.save()

        res.json({ message: 'Connection request ignored' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default router
