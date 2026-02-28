import React, { useState, useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import connectionService from '../services/connectionService'
import { Link } from 'react-router-dom'

const Network = () => {
    const [invitations, setInvitations] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [connections, setConnections] = useState([])
    const [activeTab, setActiveTab] = useState('grow') // 'grow' or 'my-network'
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [reqs, suggs, conns] = await Promise.all([
                connectionService.getRequests(),
                connectionService.getSuggestions(),
                connectionService.getConnections()
            ])
            setInvitations(reqs || [])
            setSuggestions(suggs || [])
            setConnections(conns || [])
        } catch (error) {
            console.error('Failed to fetch network data', error)
        } finally {
            setLoading(false)
        }
    }

    const handleConnect = async (userId) => {
        try {
            await connectionService.sendRequest(userId)
            // Remove from suggestions locally
            setSuggestions(suggestions.filter(u => u._id !== userId))
            alert('Connection request sent!')
        } catch (error) {
            console.error(error)
        }
    }

    const handleAccept = async (senderId) => {
        try {
            await connectionService.acceptRequest(senderId)
            setInvitations(invitations.filter(i => i.sender._id !== senderId))
            fetchData() // Refresh to update connections list
        } catch (error) {
            console.error(error)
        }
    }

    const handleIgnore = async (senderId) => {
        try {
            await connectionService.ignoreRequest(senderId)
            setInvitations(invitations.filter(i => i.sender._id !== senderId))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar (Stats) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-24">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-900 dark:text-white">Manage my network</h3>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => setActiveTab('grow')}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${activeTab === 'grow' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-xl">person_add</span>
                                        <span className="font-medium">Grow</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('my-network')}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${activeTab === 'my-network' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons text-xl">group</span>
                                        <span className="font-medium">Connections</span>
                                    </div>
                                    <span className="text-slate-900 dark:text-white font-bold">{connections.length}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        {/* Invitations */}
                        {invitations.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Invitations</h2>
                                    <span className="text-slate-500 dark:text-slate-400">{invitations.length} pending</span>
                                </div>
                                <div className="space-y-4">
                                    {invitations.map(inv => (
                                        <div key={inv.sender._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700">
                                            <div className="flex items-center gap-4">
                                                <img src={inv.sender.avatar} alt={inv.sender.name} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-600" />
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{inv.sender.name}</h3>
                                                    <p className="text-slate-500 dark:text-slate-400">{inv.sender.headline}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleIgnore(inv.sender._id)}
                                                    className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                                                >
                                                    Ignore
                                                </button>
                                                <button
                                                    onClick={() => handleAccept(inv.sender._id)}
                                                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-md shadow-primary/20 transition-all"
                                                >
                                                    Accept
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'grow' ? (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">People you may know</h2>
                                    <button className="text-primary font-medium hover:underline">See all</button>
                                </div>

                                {suggestions.length === 0 && !loading ? (
                                    <div className="text-center py-10 text-slate-500">No suggestions available right now.</div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {suggestions.map(person => (
                                            <div key={person._id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 relative group">
                                                <div className="h-20 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                                                    <button
                                                        onClick={() => handleConnect(person._id)}
                                                        className="absolute top-2 right-2 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
                                                    >
                                                        <span className="material-icons text-sm">close</span>
                                                    </button>
                                                </div>
                                                <div className="px-4 pb-4 text-center -mt-10">
                                                    <img src={person.avatar} alt={person.name} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-800 mx-auto shadow-md" />
                                                    <Link to={`/profile/${person._id}`} className="block mt-2 font-bold text-slate-900 dark:text-white hover:underline truncate">
                                                        {person.name}
                                                    </Link>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 h-8 line-clamp-2 mt-1 mb-4">
                                                        {person.headline}
                                                    </p>
                                                    <button
                                                        onClick={() => handleConnect(person._id)}
                                                        className="w-full py-1.5 rounded-full border border-primary text-primary font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <span className="material-icons text-sm">person_add</span> Connect
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Your Connections</h2>
                                {connections.length === 0 ? (
                                    <div className="text-center py-10 text-slate-500">You don't have any connections yet.</div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {connections.map(conn => (
                                            <div key={conn._id} className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                                <img src={conn.avatar} alt={conn.name} className="w-16 h-16 rounded-full object-cover" />
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{conn.name}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{conn.headline}</p>
                                                    <p className="text-xs text-slate-400 mt-1">Connected just now</p>
                                                </div>
                                                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                                    <span className="material-icons">more_horiz</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Network
