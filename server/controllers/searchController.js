import User from '../models/User.js'

// @desc    Search Users
// @route   GET /api/search
// @access  Public
export const search = async (req, res) => {
    const query = req.query.q

    if (!query) {
        return res.json({ users: [] })
    }

    try {
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { headline: { $regex: query, $options: 'i' } }
            ]
        }).limit(5).select('name headline avatar')

        res.json({ users })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}
