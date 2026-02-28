import express from 'express'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        // Normalize path to use forward slashes for URLs
        const filePath = req.file.path.replace(/\\/g, '/')
        res.json({
            message: 'Image uploaded',
            filePath: `/${filePath}`
        })
    } else {
        res.status(400).json({ message: 'No file uploaded' })
    }
})

export default router
