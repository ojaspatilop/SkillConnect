import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get user profile by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Update user profile
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { name, headline, location, about, skills, experience, education, avatar, coverImage } = req.body

        if (name) user.name = name
        if (headline) user.headline = headline
        if (location) user.location = location
        if (about) user.about = about
        if (skills) user.skills = skills
        if (experience) user.experience = experience
        if (education) user.education = education
        if (avatar) user.avatar = avatar
        if (coverImage) user.coverImage = coverImage

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            headline: updatedUser.headline,
            avatar: updatedUser.avatar,
            about: updatedUser.about,
            skills: updatedUser.skills,
            experience: updatedUser.experience,
            education: updatedUser.education,
            token: req.headers.authorization.split(' ')[1] // Keep existing token
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default router
