import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const SidebarLeft = () => {
    const { user } = useAuth()

    if (!user) return null

    return (
        <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary to-blue-400 relative">
                    {/* Optional: Add cover image here */}
                </div>
                <div className="px-5 pb-5 text-center relative">
                    <div className="w-20 h-20 mx-auto -mt-10 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-sm">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-3">
                        <Link to="/profile" className="text-lg font-bold text-slate-900 dark:text-white hover:underline hover:text-primary transition-colors">
                            {user.name}
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {user.headline || 'Add a headline to your profile'}
                        </p>
                    </div>

                    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700 text-left">
                        <div className="flex justify-between items-center mb-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg cursor-pointer transition-colors -mx-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Profile viewers</span>
                            <span className="text-sm font-bold text-primary">1,245</span>
                        </div>
                        <div className="flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg cursor-pointer transition-colors -mx-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Connections</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">5,820</span>
                        </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-left">
                        <div className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg cursor-pointer transition-colors -mx-2">
                            <span className="material-icons text-slate-400 text-xl">bookmark</span>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">My Items</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Widget (Placeholder for now) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Your Skills</h3>
                    <span className="material-icons text-slate-400 text-sm cursor-pointer hover:text-primary">edit</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-slate-700 dark:text-slate-300">UX Design</span>
                            <span className="text-slate-500">85%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-slate-700 dark:text-slate-300">React Navigation</span>
                            <span className="text-slate-500">60%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-slate-700 dark:text-slate-300">Prototyping</span>
                            <span className="text-slate-500">92%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-5 text-sm font-medium text-primary hover:bg-primary/5 py-2 rounded-lg transition-colors">
                    Show all 12 skills
                </button>
            </div>
        </div>
    )
}

export default SidebarLeft
