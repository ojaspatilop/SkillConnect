const API_URL = 'http://localhost:5000/api/posts'

const postService = {
    getPosts: async (token) => {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch posts')
        }
        return data
    },

    createPost: async (postData, token) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create post')
        }
        return data
    }
}

export default postService
