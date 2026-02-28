import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    const [liked, setLiked] = useState(false)

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex gap-4 mb-4">
                <Link to={`/profile/${post.author?._id}`}>
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                </Link>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link to={`/profile/${post.author?._id}`} className="text-sm font-bold text-slate-900 dark:text-white cursor-pointer hover:underline hover:text-primary transition-colors block">
                                {post.author?.name || 'Unknown'}
                            </Link>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{post.author?.headline || ''}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                <span className="material-icons text-[10px]">public</span>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <span className="material-icons">more_horiz</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="text-sm text-slate-800 dark:text-slate-200 mb-4 leading-relaxed whitespace-pre-line">
                {post.content}
            </div>

            {post.image && (
                <div className="rounded-xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-700">
                    <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            {/* Stats */}
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-icons text-white text-[10px]">thumb_up</span>
                    </span>
                    <span className="hover:text-primary hover:underline cursor-pointer">
                        {liked ? (post.likes?.length || 0) + 1 : (post.likes?.length || 0)}
                    </span>
                </div>
                <div className="flex gap-3">
                    <span className="hover:text-primary hover:underline cursor-pointer">{post.comments?.length || 0} comments</span>
                    <span className="hover:text-primary hover:underline cursor-pointer">{post.shares || 0} reposts</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center -mx-2">
                <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-lg transition-colors ${liked ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                >
                    <span className={`material-icons-outlined text-xl ${liked ? 'fill-current' : ''}`}>thumb_up</span>
                    <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="material-icons-outlined text-xl">chat_bubble_outline</span>
                    <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="material-icons-outlined text-xl">repeat</span>
                    <span className="text-sm font-medium">Repost</span>
                </button>
                <button className="flex items-center justify-center gap-2 flex-1 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="material-icons-outlined text-xl">send</span>
                    <span className="text-sm font-medium">Send</span>
                </button>
            </div>
        </div>
    )
}

export default Post
