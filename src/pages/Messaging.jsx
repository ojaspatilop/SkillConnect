import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import messageService from '../services/messageService'
import { useAuth } from '../context/AuthContext'
import { FiSend, FiMoreVertical, FiSearch, FiMessageSquare } from 'react-icons/fi'

const Messaging = () => {
    const { user } = useAuth()
    const [conversations, setConversations] = useState([])
    const [activeConversation, setActiveConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const messagesEndRef = useRef(null)


    const location = useLocation()

    useEffect(() => {
        if (location.state?.startConversationWith) {
            const targetUser = location.state.startConversationWith
            // Check if already in conversations list
            const existingConv = conversations.find(c => c._id === targetUser._id)
            if (existingConv) {
                setActiveConversation(existingConv)
            } else {
                // If not in list, temporarily add it or set it as active directly
                // We might need to ensure the backend returns this user in the list next time or handle a "temporary" conversation
                setActiveConversation(targetUser)
            }
            // Clear state so it doesn't persist on refresh/navigation if desired, 
            // but for now keeping it simple.
        }
    }, [location.state, conversations]) // Depend on conversations to check existence

    useEffect(() => {
        fetchConversations()
    }, [])

    useEffect(() => {
        if (activeConversation) {
            fetchMessages(activeConversation._id)
            // Optional: Set up polling here for real-time-ish updates
            const interval = setInterval(() => {
                fetchMessages(activeConversation._id)
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [activeConversation])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const fetchConversations = async () => {
        try {
            const data = await messageService.getConversationsList()
            setConversations(data)
            if (data.length > 0 && !activeConversation) {
                // Optionally select the first conversation automatically
                // setActiveConversation(data[0]) 
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMessages = async (userId) => {
        try {
            const data = await messageService.getConversation(userId)
            setMessages(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || !activeConversation) return

        try {
            // Optimistic update
            const tempMessage = {
                _id: Date.now(),
                sender: user._id,
                receiver: activeConversation._id,
                content: newMessage,
                createdAt: new Date().toISOString()
            }
            setMessages([...messages, tempMessage])
            setNewMessage('')

            // Actual send
            await messageService.sendMessage(activeConversation._id, newMessage)
            fetchMessages(activeConversation._id) // Refresh to get server timestamp/ID
            fetchConversations() // Update 'last message' snippet in list if we add that later
        } catch (error) {
            console.error(error)
            // Revert on failure if needed
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)]">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex h-full">
                    {/* Sidebar / Conversation List */}
                    <div className={`w-full md:w-1/3 border-r border-slate-200 dark:border-slate-700 flex flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Messaging</h2>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-3 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-200"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {loading ? (
                                <div className="p-4 text-center text-slate-500">Loading...</div>
                            ) : conversations.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">
                                    <FiMessageSquare className="mx-auto text-4xl mb-2 opacity-50" />
                                    <p>No conversations yet. Connect with people to start chatting!</p>
                                </div>
                            ) : (
                                conversations.map(conv => (
                                    <div
                                        key={conv._id}
                                        onClick={() => setActiveConversation(conv)}
                                        className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${activeConversation?._id === conv._id ? 'bg-blue-50 dark:bg-slate-700/80 border-l-4 border-primary' : ''}`}
                                    >
                                        <div className="relative">
                                            <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                                            {/* Online status indicator could go here */}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-semibold text-slate-900 dark:text-white truncate">{conv.name}</h3>
                                                {/* <span className="text-xs text-slate-500">2m</span> */}
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{conv.headline}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className={`w-full md:w-2/3 flex flex-col ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
                        {activeConversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 z-10">
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300"
                                            onClick={() => setActiveConversation(null)}
                                        >
                                            <span className="material-icons">arrow_back</span>
                                        </button>
                                        <img src={activeConversation.avatar} alt={activeConversation.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">{activeConversation.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{activeConversation.headline}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <FiMoreVertical size={20} />
                                    </button>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 custom-scrollbar">
                                    {messages.map((msg, index) => {
                                        const isMe = msg.sender === user._id || msg.sender?._id === user._id
                                        return (
                                            <div key={msg._id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 shadow-sm ${isMe
                                                    ? 'bg-primary text-white rounded-br-none'
                                                    : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-none border border-slate-100 dark:border-slate-600'
                                                    }`}>
                                                    <p>{msg.content}</p>
                                                    <div className={`text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-slate-400'} text-right`}>
                                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Write a message..."
                                            className="flex-1 p-3 bg-slate-100 dark:bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 dark:text-white"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FiSend size={20} />
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                                    <FiMessageSquare size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Your Messages</h3>
                                <p className="text-center max-w-xs">Select a conversation from the left to start chatting or connect with new people.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Messaging
