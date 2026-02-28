import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import notificationService from '../../services/notificationService'
// import './Navbar.css' // Removed

const Navbar = () => {
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const [showDropdown, setShowDropdown] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const dropdownRef = useRef(null)
    const notificationRef = useRef(null)
    const searchRef = useRef(null)

    useEffect(() => {
        if (user) {
            fetchNotifications()
            // Poll for notifications every minute
            const interval = setInterval(fetchNotifications, 60000)
            return () => clearInterval(interval)
        }
    }, [user])

    const fetchNotifications = async () => {
        try {
            const data = await notificationService.getNotifications()
            if (Array.isArray(data)) {
                setNotifications(data)
                setUnreadCount(data.filter(n => !n.read).length)
            } else {
                setNotifications([])
                setUnreadCount(0)
            }
        } catch (error) {
            console.error('Failed to fetch notifications')
        }
    }

    const handleNotificationClick = async (notification) => {
        if (!notification.read) {
            try {
                await notificationService.markAsRead(notification._id)
                setNotifications(prev => prev.map(n => n._id === notification._id ? { ...n, read: true } : n))
                setUnreadCount(prev => Math.max(0, prev - 1))
            } catch (error) {
                console.error(error)
            }
        }
        setShowNotifications(false)
    }

    const markAllRead = async () => {
        try {
            await notificationService.markAllAsRead()
            setNotifications(prev => prev.map(n => ({ ...n, read: true })))
            setUnreadCount(0)
        } catch (error) {
            console.error(error)
        }
    }

    const isActive = (path) => location.pathname === path ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([])
                setSearchQuery('')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearch = async (e) => {
        const query = e.target.value
        setSearchQuery(query)

        if (query.length > 2) {
            try {
                const res = await fetch(`http://localhost:5000/api/search?q=${query}`)
                const data = await res.json()
                setSearchResults(data.users || [])
            } catch (err) {
                console.error(err)
            }
        } else {
            setSearchResults([])
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">Skill<span className="text-primary">Connect</span></span>
                    </Link>

                    {/* Desktop Menu (Auth) */}
                    {user ? (
                        <>
                            {/* Search */}
                            <div className="hidden md:block w-full max-w-md mx-8" ref={searchRef}>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-icons text-slate-400">search</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-full leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition duration-150 ease-in-out sm:text-sm"
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    {searchResults.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-50 p-2">
                                            {searchResults.map(u => (
                                                <div key={u._id}
                                                    className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors"
                                                    onClick={() => {
                                                        alert(`Selected: ${u.name}`)
                                                        setSearchResults([])
                                                        setSearchQuery('')
                                                    }}>
                                                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{u.name}</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">{u.headline}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-6">
                                <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
                                    <span className="material-icons-outlined">home</span>
                                    <span className="text-xs font-medium">Home</span>
                                </Link>
                                <Link to="/network" className={`flex flex-col items-center gap-1 ${isActive('/network')}`}>
                                    <span className="material-icons-outlined">people</span>
                                    <span className="text-xs font-medium">Network</span>
                                </Link>
                                <Link to="/jobs" className={`flex flex-col items-center gap-1 ${isActive('/jobs')}`}>
                                    <span className="material-icons-outlined">work</span>
                                    <span className="text-xs font-medium">Jobs</span>
                                </Link>
                                <Link to="/learning" className={`flex flex-col items-center gap-1 ${isActive('/learning')}`}>
                                    <span className="material-icons-outlined">school</span>
                                    <span className="text-xs font-medium">Learning</span>
                                </Link>
                                <Link to="/messaging" className={`flex flex-col items-center gap-1 ${isActive('/messaging')}`}>
                                    <span className="material-icons-outlined">message</span>
                                    <span className="text-xs font-medium">Messaging</span>
                                </Link>
                                <div className="relative" ref={notificationRef}>
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className={`flex flex-col items-center gap-1 ${isActive('/notifications')} relative focus:outline-none`}
                                    >
                                        <span className="material-icons-outlined">notifications</span>
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                                {unreadCount}
                                            </span>
                                        )}
                                        <span className="text-xs font-medium">Notifs</span>
                                    </button>

                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 z-50">
                                            <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                                                <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                                                {unreadCount > 0 && (
                                                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                                                        Mark all read
                                                    </button>
                                                )}
                                            </div>
                                            <div>
                                                {!Array.isArray(notifications) || notifications.length === 0 ? (
                                                    <div className="p-4 text-center text-slate-500 text-sm">
                                                        No notifications yet.
                                                    </div>
                                                ) : (
                                                    notifications.map(notification => {
                                                        if (!notification || !notification.sender) return null
                                                        return (
                                                            <div
                                                                key={notification._id}
                                                                onClick={() => handleNotificationClick(notification)}
                                                                className={`p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-slate-700/30' : ''}`}
                                                            >
                                                                <img
                                                                    src={notification.sender.avatar || 'https://ui-avatars.com/api/?name=Unknown'}
                                                                    alt={notification.sender.name || 'Unknown'}
                                                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm text-slate-800 dark:text-slate-200">
                                                                        <span className="font-bold">{notification.sender.name || 'Unknown User'}</span>{' '}
                                                                        {notification.message}
                                                                    </p>
                                                                    <p className="text-xs text-slate-400 mt-1">
                                                                        {new Date(notification.createdAt).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                {!notification.read && (
                                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                                                )}
                                                            </div>
                                                        )
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors focus:outline-none"
                                >
                                    <span className="material-icons-outlined">
                                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                                    </span>
                                    <span className="text-xs font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                                </button>

                                {/* Profile Dropdown */}
                                <div className="ml-4 border-l border-slate-200 dark:border-slate-700 pl-4 relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex flex-col items-center gap-1 focus:outline-none"
                                    >
                                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Me</span>
                                    </button>

                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                                <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.headline}</div>
                                            </div>
                                            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50" onClick={() => setShowDropdown(false)}>
                                                <span className="material-icons-outlined text-lg">person</span> View Profile
                                            </Link>
                                            <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                                            <button
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-700/50 text-left"
                                                onClick={() => {
                                                    logout()
                                                    setShowDropdown(false)
                                                }}
                                            >
                                                <span className="material-icons-outlined text-lg">logout</span> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Unauthenticated Nav */
                        <>
                            <div className="hidden md:flex space-x-8 items-center">
                                <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/jobs">Find Jobs</Link>
                                <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/network">Networking</Link>
                                <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/learning">Learning</Link>

                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                                >
                                    <span className="material-icons-outlined">
                                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                                    </span>
                                </button>
                            </div>
                            <div className="hidden md:flex items-center space-x-4">
                                <Link className="text-slate-600 dark:text-slate-300 font-medium hover:text-primary transition-colors" to="/login">Log In</Link>
                                <Link className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40" to="/register">Join Now</Link>
                            </div>
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button className="text-slate-600 dark:text-slate-300 hover:text-primary p-2">
                            <span className="material-icons text-2xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
