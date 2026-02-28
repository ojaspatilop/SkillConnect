import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Job from './models/Job.js'
import User from './models/User.js'

dotenv.config()

const sampleJobs = [
    {
        title: 'Senior React Developer',
        company: 'TechCorp Inc.',
        location: 'Remote',
        type: 'Full-time',
        description: `We are looking for an experienced React Developer to join our team.
        
        Responsibilities:
        - Build and maintain scalable web applications using React.js
        - Collaborate with cross-functional teams to define, design, and ship new features
        - Optimize applications for maximum speed and scalability
        
        Requirements:
        - 5+ years of experience with JavaScript/ES6+ and React
        - Experience with state management (Redux, Context API)
        - Familiarity with RESTful APIs`,
        skills: ['React', 'Redux', 'JavaScript', 'Node.js'],
        salaryRange: '$120k - $150k'
    },
    {
        title: 'UX/UI Designer',
        company: 'Creative Studios',
        location: 'New York, NY',
        type: 'Contract',
        description: `Join our award-winning design team to create beautiful and intuitive user experiences.
        
        You will work closely with product managers and developers to visual concepts into functional designs.`,
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        salaryRange: '$80 - $100 / hr'
    },
    {
        title: 'Backend Engineer (Node.js)',
        company: 'FinTech Solutions',
        location: 'San Francisco, CA',
        type: 'Full-time',
        description: `We are building the future of finance. We need a strong backend engineer to help us scale our infrastructure.
        
        Must have experience with microservices architecture and high-load systems.`,
        skills: ['Node.js', 'System Design', 'MongoDB', 'AWS'],
        salaryRange: '$140k - $180k'
    },
    {
        title: 'Product Manager',
        company: 'StartupX',
        location: 'Remote',
        type: 'Full-time',
        description: `Lead product development from ideation to launch. You will define the product roadmap and work with engineering to deliver value to customers.`,
        skills: ['Product Strategy', 'Agile', 'Data Analysis'],
        salaryRange: '$110k - $140k'
    },
    {
        title: 'DevOps Engineer',
        company: 'Cloud Systems',
        location: 'Austin, TX',
        type: 'Full-time',
        description: `Manage our cloud infrastructure and CI/CD pipelines. Ensure high availability and security.`,
        skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
        salaryRange: '$130k - $160k'
    },
    {
        title: 'Marketing Specialist',
        company: 'GrowthHackers',
        location: 'London, UK (Remote)',
        type: 'Part-time',
        description: `Help us grow our user base through targeted marketing campaigns and content strategy.`,
        skills: ['SEO', 'Content Marketing', 'Google Analytics'],
        salaryRange: '$40 - $60 / hr'
    },
    {
        title: 'Junior Web Developer',
        company: 'WebFlow Agency',
        location: 'Berlin, Germany',
        type: 'Internship',
        description: `Great opportunity for a junior developer to learn from industry experts. You will work on client projects and learn modern web development.`,
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        salaryRange: '€2000 / month'
    }
]

const seedJobs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected')

        // Clear existing jobs
        await Job.deleteMany({})
        console.log('Cleared existing jobs')

        // Get a user to assign as poster (optional, but good for schema validity)
        const user = await User.findOne()
        const posterId = user ? user._id : null

        const jobsWithPoster = sampleJobs.map(job => ({
            ...job,
            postedBy: posterId
        }))

        await Job.insertMany(jobsWithPoster)
        console.log('Sample jobs added successfully')

        process.exit()
    } catch (error) {
        console.error('Error seeding jobs:', error)
        process.exit(1)
    }
}

seedJobs()
