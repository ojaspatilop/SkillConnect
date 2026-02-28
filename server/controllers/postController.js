import Post from '../models/Post.js'
import User from '../models/User.js'

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { content, image } = req.body

        const post = await Post.create({
            author: req.user.id,
            content,
            image
        })

        const populatedPost = await Post.findById(post._id).populate('author', 'name avatar headline')

        res.status(201).json(populatedPost)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name avatar headline')
            .sort({ createdAt: -1 })

        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
