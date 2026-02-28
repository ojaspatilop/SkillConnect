import React from 'react'
import { FiMapPin, FiLink, FiCalendar, FiEdit2, FiPlus, FiMessageSquare } from 'react-icons/fi'

const ProfileHeader = ({ user, isOwnProfile, onEdit, onMessage, connectionStatus, onConnect, onUploadAvatar, uploading }) => {
    if (!user) return null

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
            {/* Cover Image */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                {/* Optional: Add actual cover image here */}
                {isOwnProfile && (
                    <button onClick={onEdit} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors">
                        <FiEdit2 size={18} />
                    </button>
                )}
            </div>

            <div className="px-6 pb-6 relative">
                {/* Avatar */}
                <div className="relative -mt-20 md:-mt-24 mb-4 flex justify-between items-end">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md"
                        />
                        {isOwnProfile && (
                            <button
                                onClick={onUploadAvatar}
                                disabled={uploading}
                                className="absolute bottom-2 right-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-white p-2 rounded-full shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-600 transition-all disabled:opacity-50"
                            >
                                {uploading ? <span className="material-icons animate-spin text-sm">refresh</span> : <FiEdit2 size={14} />}
                            </button>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-2">
                        {isOwnProfile ? (
                            <button onClick={onEdit} className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                <FiEdit2 size={18} /> <span>Edit Profile</span>
                            </button>
                        ) : (
                            <>
                                {connectionStatus === 'connected' ? (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl font-semibold border border-green-200 dark:border-green-800">
                                        <span className="material-icons text-sm">check</span> <span>Connected</span>
                                    </div>
                                ) : connectionStatus === 'pending' ? (
                                    <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-semibold cursor-not-allowed">
                                        <span className="material-icons text-sm">hourglass_empty</span> <span>Pending</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={onConnect}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors shadow-md shadow-primary/20"
                                    >
                                        <FiPlus size={18} /> <span>Connect</span>
                                    </button>
                                )}

                                <button onClick={onMessage} className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-xl font-semibold transition-colors">
                                    <FiMessageSquare size={18} /> <span>Message</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Profile Info */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                        {user.name}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 max-w-2xl">
                        {user.headline}
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
                        <span className="flex items-center gap-1.5">
                            <FiMapPin className="text-slate-400" /> San Francisco, CA
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiLink className="text-slate-400" />
                            <a href="#" className="text-primary hover:underline font-medium">portfolio.com</a>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiCalendar className="text-slate-400" /> Joined January 2024
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 py-4 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">500+</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Connections</span>
                        </div>
                        <div className="flex flex-col cursor-pointer hover:opacity-80">
                            <span className="font-bold text-primary">1,245</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Profile Views</span>
                        </div>
                        <div className="flex flex-col cursor-pointer hover:opacity-80">
                            <span className="font-bold text-slate-900 dark:text-white">42</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">Post Impressions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
