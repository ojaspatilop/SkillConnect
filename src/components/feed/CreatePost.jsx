import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FiImage, FiCalendar, FiFileText } from 'react-icons/fi'
import postService from '../../services/postService'

const CreatePost = ({ onPostCreated }) => {
    const { user } = useAuth()
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    if (!user) return null

    const handlePost = async () => {
        if (!content.trim()) return

        setLoading(true)
        try {
            const newPost = await postService.createPost({ content }, user.token)
            onPostCreated(newPost)
            setContent('')
        } catch (error) {
            console.error('Failed to post:', error)
            alert('Failed to creates post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6">
            <div className="flex gap-4 mb-4">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="flex-grow">
                    <textarea
                        placeholder="Start a post, try writing with AI..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 text-slate-700 dark:text-slate-200 resize-none min-h-[3rem] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder-slate-400"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 rounded-lg transition-colors">
                        <span className="material-icons text-blue-500 text-xl">image</span>
                        <span className="text-sm font-medium">Media</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-500 rounded-lg transition-colors">
                        <span className="material-icons text-purple-500 text-xl">event</span>
                        <span className="text-sm font-medium">Event</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 rounded-lg transition-colors">
                        <span className="material-icons text-orange-500 text-xl">article</span>
                        <span className="text-sm font-medium">Article</span>
                    </button>
                </div>

                {content && (
                    <button
                        onClick={handlePost}
                        disabled={loading}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreatePost
