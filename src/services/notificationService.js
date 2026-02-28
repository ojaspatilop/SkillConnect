const API_URL = 'http://localhost:5000/api/notifications'

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('skillconnect_user'))
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {}
}

const getNotifications = async () => {
    const res = await fetch(API_URL, {
        headers: getAuthHeader()
    })
    return res.json()
}

const markAsRead = async (id) => {
    const res = await fetch(`${API_URL}/${id}/read`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        }
    })
    return res.json()
}

const markAllAsRead = async () => {
    const res = await fetch(`${API_URL}/mark-all-read`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        }
    })
    return res.json()
}

const notificationService = {
    getNotifications,
    markAsRead,
    markAllAsRead
}

export default notificationService
