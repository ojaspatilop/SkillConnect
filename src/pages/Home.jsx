import React, { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import CreatePost from '../components/feed/CreatePost'
import Post from '../components/feed/Post'
import SidebarLeft from '../components/feed/SidebarLeft'
import SidebarRight from '../components/feed/SidebarRight'
import postService from '../services/postService'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/common/Loading'

const Home = () => {
    const { user } = useAuth()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchPosts = async () => {
        try {
            const data = await postService.getPosts(user.token)
            setPosts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [user.token])

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts])
    }

    if (loading) return <Loading />

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24">
                            <SidebarLeft />
                        </div>
                    </div>

                    {/* Main Feed */}
                    <div className="md:col-span-8 lg:col-span-6">
                        <CreatePost onPostCreated={handlePostCreated} />

                        {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4 text-center border border-red-200">{error}</div>}

                        <div className="space-y-4">
                            {posts.length === 0 ? (
                                <div className="text-center text-slate-500 dark:text-slate-400 py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <div className="material-icons text-4xl mb-2 text-slate-300">post_add</div>
                                    <p>No posts yet. Be the first to share something!</p>
                                </div>
                            ) : (
                                posts.map(post => (
                                    <Post key={post._id} post={post} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="hidden md:block md:col-span-4 lg:col-span-3">
                        <div className="sticky top-24">
                            <SidebarRight />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
