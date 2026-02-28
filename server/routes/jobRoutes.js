import express from 'express'
import Job from '../models/Job.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get all jobs with optional filtering
router.get('/', protect, async (req, res) => {
    try {
        const { search, location, type } = req.query
        let query = {}

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { skills: { $in: [new RegExp(search, 'i')] } }
            ]
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' }
        }
        if (type) {
            query.type = type
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 })
        res.json(jobs)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Create a new job
router.post('/', protect, async (req, res) => {
    try {
        const { title, company, location, type, description, skills, salaryRange } = req.body

        const newJob = new Job({
            title,
            company,
            location,
            type,
            description,
            skills,
            salaryRange,
            postedBy: req.user.id
        })

        const savedJob = await newJob.save()
        res.status(201).json(savedJob)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Apply for a job
router.post('/:id/apply', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) {
            return res.status(404).json({ message: 'Job not found' })
        }

        // Check if already applied
        const alreadyApplied = job.applicants.find(app => app.user.toString() === req.user.id)
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' })
        }

        job.applicants.push({ user: req.user.id })
        await job.save()

        res.json({ message: 'Application submitted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default router
