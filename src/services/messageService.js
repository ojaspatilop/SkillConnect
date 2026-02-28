const API_URL = 'http://localhost:5000/api/messages'

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('skillconnect_user'))
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {}
}

const sendMessage = async (receiverId, content) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
        },
        body: JSON.stringify({ receiverId, content })
    })
    return res.json()
}

const getConversation = async (userId) => {
    const res = await fetch(`${API_URL}/${userId}`, {
        headers: getAuthHeader()
    })
    return res.json()
}

const getConversationsList = async () => {
    const res = await fetch(`${API_URL}/conversations/list`, {
        headers: getAuthHeader()
    })
    return res.json()
}

const messageService = {
    sendMessage,
    getConversation,
    getConversationsList
}

export default messageService
