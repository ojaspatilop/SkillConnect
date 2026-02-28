const API_URL = 'http://localhost:5000/api/upload'

const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(API_URL, {
        method: 'POST',
        body: formData
    })

    if (!res.ok) {
        throw new Error('Upload failed')
    }

    return res.json()
}

const uploadService = {
    uploadImage
}

export default uploadService
