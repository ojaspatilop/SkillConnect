const API_URL = 'http://localhost:5000/api/auth'

const authService = {
    register: async (userData) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong')
        }

        if (data.token) {
            localStorage.setItem('skillconnect_user', JSON.stringify(data))
        }
        return data
    },

    login: async (userData) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong')
        }

        if (data.token) {
            localStorage.setItem('skillconnect_user', JSON.stringify(data))
        }
        return data
    },

    logout: () => {
        localStorage.removeItem('skillconnect_user')
    }
}

export default authService
