import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import searchRoutes from './routes/searchRoutes.js'

import connectionRoutes from './routes/connectionRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url'
import uploadRoutes from './routes/uploadRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_dev_only'

if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET not found in .env, using fallback.')
}

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillconnect')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err))

// Basic Route
app.get('/', (req, res) => {
    res.send('SkillConnect API is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/connections', connectionRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/upload', uploadRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
