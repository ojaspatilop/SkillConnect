const API_URL = 'http://localhost:5000/api/jobs'

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('skillconnect_user'))
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {}
}

const getJobs = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString()
    const res = await fetch(`${API_URL}?${queryParams}`, {
        headers: getAuthHeader()
    })
    return res.json()
}

const createJob = async (jobData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(jobData)
    })
    return res.json()
}

const applyForJob = async (jobId) => {
    const res = await fetch(`${API_URL}/${jobId}/apply`, {
        method: 'POST',
        headers: getAuthHeader()
    })
    return res.json()
}

const jobService = {
    getJobs,
    createJob,
    applyForJob
}

export default jobService
