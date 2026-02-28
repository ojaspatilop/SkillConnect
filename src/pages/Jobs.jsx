import React, { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import jobService from '../services/jobService'
import { FiSearch, FiMapPin, FiBriefcase, FiDollarSign, FiClock } from 'react-icons/fi'

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const [savedJobs, setSavedJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all') // 'all' or 'saved'

    // Filter States
    const [selectedType, setSelectedType] = useState('All')
    const [selectedDate, setSelectedDate] = useState('Any Time')

    // Modal State
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [applying, setApplying] = useState(false)

    useEffect(() => {
        fetchJobs()
    }, [])

    useEffect(() => {
        filterJobs()
    }, [jobs, searchQuery, selectedType, selectedDate, activeTab, savedJobs])

    const fetchJobs = async () => {
        setLoading(true)
        try {
            const data = await jobService.getJobs()
            setJobs(data)
            if (data.length > 0) setSelectedJob(data[0])
        } catch (error) {
            console.error('Failed to fetch jobs', error)
        } finally {
            setLoading(false)
        }
    }

    const filterJobs = () => {
        let result = activeTab === 'saved' ? savedJobs : jobs

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.company.toLowerCase().includes(query) ||
                job.skills?.some(skill => skill.toLowerCase().includes(query))
            )
        }

        // Type Filter
        if (selectedType !== 'All') {
            result = result.filter(job => job.type === selectedType)
        }

        // Date Filter (Mock logic as real dates vary)
        if (selectedDate === 'Past 24h') {
            const oneDayAgo = new Date(Date.now() - 86400000)
            result = result.filter(job => new Date(job.createdAt) > oneDayAgo)
        } else if (selectedDate === 'Past Week') {
            const oneWeekAgo = new Date(Date.now() - 7 * 86400000)
            result = result.filter(job => new Date(job.createdAt) > oneWeekAgo)
        }

        setFilteredJobs(result)
    }

    const toggleSaveJob = (e, job) => {
        e.stopPropagation()
        const isSaved = savedJobs.find(j => j._id === job._id)
        if (isSaved) {
            setSavedJobs(savedJobs.filter(j => j._id !== job._id))
        } else {
            setSavedJobs([...savedJobs, job])
        }
    }

    const handleApply = async (e) => {
        e.preventDefault()
        setApplying(true)
        // Simulate API call
        setTimeout(async () => {
            try {
                // Real API call would go here: await jobService.applyForJob(selectedJob._id)
                setShowApplyModal(false)
                setApplying(false)
                alert(`Successfully applied to ${selectedJob.title} at ${selectedJob.company}!`)
            } catch (error) {
                console.error(error)
                setApplying(false)
            }
        }, 1500)
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Find Your Next Role</h1>
                        <p className="text-slate-500 dark:text-slate-400">match your skills to the perfect job</p>
                    </div>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                        >
                            All Jobs
                        </button>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'saved' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                        >
                            <span className="material-icons text-sm">bookmark</span> Saved
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden pb-4">

                    {/* Filters Sidebar (Mobile: Top, Desktop: Left) */}
                    <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                            />
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-icons text-primary text-sm">filter_list</span> Filters
                            </h3>

                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Type</label>
                                <div className="space-y-2">
                                    {['All', 'Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'].map(type => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedType === type ? 'bg-primary border-primary' : 'border-slate-300 dark:border-slate-600 group-hover:border-primary'}`}>
                                                {selectedType === type && <span className="material-icons text-white text-[10px]">check</span>}
                                            </div>
                                            <input
                                                type="radio"
                                                name="jobType"
                                                className="hidden"
                                                checked={selectedType === type}
                                                onChange={() => setSelectedType(type)}
                                            />
                                            <span className={`text-sm ${selectedType === type ? 'text-primary font-medium' : 'text-slate-600 dark:text-slate-400'}`}>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date Posted</label>
                                <select
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full p-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary"
                                >
                                    <option>Any Time</option>
                                    <option>Past 24h</option>
                                    <option>Past Week</option>
                                    <option>Past Month</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="lg:col-span-4 h-full overflow-y-auto pr-2 custom-scrollbar space-y-3">
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-icons text-slate-400 text-3xl">work_off</span>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white">No jobs found</h3>
                                <p className="text-sm text-slate-500">Try adjusting your filters</p>
                            </div>
                        ) : (
                            filteredJobs.map(job => (
                                <div
                                    key={job._id}
                                    onClick={() => setSelectedJob(job)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border group relative ${selectedJob?._id === job._id
                                        ? 'bg-white dark:bg-slate-800 border-primary ring-1 ring-primary shadow-md'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{job.title}</h3>
                                        {/* Save Button */}
                                        <button
                                            onClick={(e) => toggleSaveJob(e, job)}
                                            className="text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-icons text-xl">
                                                {savedJobs.find(j => j._id === job._id) ? 'bookmark' : 'bookmark_border'}
                                            </span>
                                        </button>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-2">{job.company}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <FiMapPin size={10} /> {job.location}
                                        </span>
                                        <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-md">
                                            {job.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        Posted {new Date(job.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Job Details */}
                    <div className="hidden lg:block lg:col-span-5 h-full overflow-y-auto custom-scrollbar bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 relative">
                        {selectedJob ? (
                            <div className="animate-fade-in">
                                <div className="sticky top-0 bg-white dark:bg-slate-800 z-10 pb-4 border-b border-slate-100 dark:border-slate-700 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
                                        {selectedJob.company.charAt(0)}
                                    </div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{selectedJob.title}</h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-300">{selectedJob.company}</p>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => setShowApplyModal(true)}
                                            className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all active:scale-95"
                                        >
                                            Apply Now
                                        </button>
                                        <button
                                            onClick={(e) => toggleSaveJob(e, selectedJob)}
                                            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <span className="material-icons text-slate-500 text-xl">
                                                {savedJobs.find(j => j._id === selectedJob._id) ? 'bookmark' : 'bookmark_border'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Salary</p>
                                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{selectedJob.salaryRange || 'Not specified'}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Job Type</p>
                                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{selectedJob.type}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">Description</h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {selectedJob.skills?.length > 0 && (
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedJob.skills.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <span className="material-icons text-5xl mb-4 opacity-20">work_outline</span>
                                <p>Select a job to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {showApplyModal && selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apply to {selectedJob.company}</h2>
                            <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleApply} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input type="text" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                <input type="email" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resume / CV</label>
                                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <span className="material-icons text-slate-400 text-3xl mb-2">cloud_upload</span>
                                    <p className="text-sm text-slate-500">Click to upload or drag & drop</p>
                                    <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 5MB</p>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setShowApplyModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-slate-600 hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={applying}
                                    className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/25 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {applying ? <span className="material-icons animate-spin text-sm">refresh</span> : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default Jobs
