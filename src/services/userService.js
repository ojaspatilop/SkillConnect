const API_URL = 'http://localhost:5000/api/users'

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('skillconnect_user'))
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {}
}

const getProfile = async (userId) => {
    const res = await fetch(`${API_URL}/${userId}`, {
        headers: getAuthHeader()
    })
    return res.json()
}

const updateProfile = async (profileData) => {
    const res = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify(profileData)
    })
    return res.json()
}

const userService = {
    getProfile,
    updateProfile
}

export default userService
