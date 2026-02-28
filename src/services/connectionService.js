const API_URL = 'http://localhost:5000/api/connections'

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('skillconnect_user'))
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {}
}

const getConnections = async () => {
    const res = await fetch(API_URL, {
        headers: getAuthHeader()
    })
    return res.json()
}

const getRequests = async () => {
    const res = await fetch(`${API_URL}/requests`, {
        headers: getAuthHeader()
    })
    return res.json()
}

const getSuggestions = async () => {
    const res = await fetch(`${API_URL}/suggestions`, {
        headers: getAuthHeader()
    })
    return res.json()
}

const sendRequest = async (userId) => {
    const res = await fetch(`${API_URL}/request/${userId}`, {
        method: 'POST',
        headers: getAuthHeader()
    })
    return res.json()
}

const acceptRequest = async (senderId) => {
    const res = await fetch(`${API_URL}/accept/${senderId}`, {
        method: 'PUT',
        headers: getAuthHeader()
    })
    return res.json()
}

const ignoreRequest = async (senderId) => {
    const res = await fetch(`${API_URL}/ignore/${senderId}`, {
        method: 'PUT',
        headers: getAuthHeader()
    })
    return res.json()
}

const connectionService = {
    getConnections,
    getRequests,
    getSuggestions,
    sendRequest,
    acceptRequest,
    ignoreRequest
}

export default connectionService
