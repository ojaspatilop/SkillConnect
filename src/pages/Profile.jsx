import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import ProfileHeader from '../components/profile/ProfileHeader'
import Education from '../components/profile/Education'
import Experience from '../components/profile/Experience'
import Skills from '../components/profile/Skills'
import ExperienceModal from '../components/profile/ExperienceModal'
import EducationModal from '../components/profile/EducationModal'
import SidebarRight from '../components/feed/SidebarRight'
import Modal from '../components/common/Modal'
import { useAuth } from '../context/AuthContext'
import userService from '../services/userService'
import connectionService from '../services/connectionService'

import uploadService from '../services/uploadService'

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user: currentUser } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Modal states
    const [activeModal, setActiveModal] = useState(null) // 'experience', 'education'
    const [editingItem, setEditingItem] = useState(null)
    const [editingIndex, setEditingIndex] = useState(null)

    const [editForm, setEditForm] = useState({
        headline: '',
        about: '',
        skills: ''
    })
    const fileInputRef = React.useRef(null)
    const [uploadType, setUploadType] = useState(null) // 'avatar' or 'cover'

    const [connectionStatus, setConnectionStatus] = useState('none') // 'none', 'pending', 'connected', 'received'

    const isOwnProfile = !id || (currentUser && id === currentUser._id)

    useEffect(() => {
        fetchProfile()
    }, [id, currentUser])

    useEffect(() => {
        if (profile && currentUser && !isOwnProfile) {
            checkConnectionStatus()
        }
    }, [profile, currentUser, isOwnProfile])

    const checkConnectionStatus = () => {
        // Check if already connected
        const isConnected = profile.connections && profile.connections.includes(currentUser._id)
        if (isConnected) {
            setConnectionStatus('connected')
            return
        }

        // Check if I sent a request (pending)
        const hasPendingRequest = profile.connectionRequests && profile.connectionRequests.some(
            req => req.sender === currentUser._id && req.status === 'pending'
        )
        if (hasPendingRequest) {
            setConnectionStatus('pending')
            return
        }

        // Check if they sent me a request (received) - Optional complexity, skipping for now to keep it simple
        // We would need to check currentUser.connectionRequests, but currentUser might be stale from context.
        // For now, default to 'none'.

        setConnectionStatus('none')
    }

    const fetchProfile = async () => {
        setLoading(true)
        try {
            if (id && id !== currentUser._id) {
                const data = await userService.getProfile(id)
                setProfile(data)
            } else if (currentUser) {
                // Fetch fresh data for current user or if no ID provided
                const data = await userService.getProfile(currentUser._id)
                setProfile(data)
                setEditForm({
                    headline: data.headline || '',
                    about: data.about || '',
                    skills: data.skills ? data.skills.join(', ') : ''
                })
            }
        } catch (error) {
            console.error('Failed to fetch profile', error)
        } finally {
            setLoading(false)
        }
    }

    const handleConnect = async () => {
        try {
            await connectionService.sendRequest(profile._id)
            setConnectionStatus('pending')
            // Optimistically update profile to reflect pending request
            setProfile(prev => ({
                ...prev,
                connectionRequests: [
                    ...(prev.connectionRequests || []),
                    { sender: currentUser._id, status: 'pending' }
                ]
            }))
            alert('Connection request sent!')
        } catch (error) {
            console.error('Failed to connect:', error)
            alert('Failed to send connection request.')
        }
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const updatedData = {
                ...editForm,
                skills: editForm.skills.split(',').map(s => s.trim()).filter(Boolean)
            }
            const updatedProfile = await userService.updateProfile(updatedData)
            setProfile(prev => ({ ...prev, ...updatedProfile }))
            setIsEditModalOpen(false)
            alert('Profile updated successfully!')
        } catch (error) {
            console.error(error)
            alert('Failed to update profile')
        }
    }

    const handleMessage = () => {
        if (profile) {
            navigate('/messaging', { state: { startConversationWith: profile } })
        }
    }

    const triggerUpload = (type) => {
        setUploadType(type)
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            alert('Please select a valid image file (JPEG/PNG)')
            return
        }

        setUploading(true)
        try {
            const data = await uploadService.uploadImage(file)
            const imageUrl = `http://localhost:5000${data.filePath}`

            // Update profile with new image
            const updatedField = uploadType === 'avatar' ? { avatar: imageUrl } : { coverImage: imageUrl }
            const updatedProfile = await userService.updateProfile(updatedField)

            setProfile(prev => ({ ...prev, ...updatedProfile }))
            alert('Image uploaded successfully!')
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
            e.target.value = '' // Reset input
        }
    }

    const openModal = (type, item = null, index = null) => {
        setActiveModal(type)
        setEditingItem(item)
        setEditingIndex(index)
    }

    const closeModal = () => {
        setActiveModal(null)
        setEditingItem(null)
        setEditingIndex(null)
    }

    const handleSaveExperience = async (formData) => {
        let updatedExperience = [...(profile.experience || [])]
        if (editingIndex !== null) {
            updatedExperience[editingIndex] = formData
        } else {
            updatedExperience.push(formData)
        }

        try {
            const updatedProfile = await userService.updateProfile({ experience: updatedExperience })
            setProfile(prev => ({ ...prev, experience: updatedProfile.experience }))
            closeModal()
        } catch (error) {
            console.error('Failed to update experience', error)
        }
    }

    const handleDeleteExperience = async () => {
        if (editingIndex === null) return
        if (!window.confirm('Are you sure you want to delete this experience?')) return

        let updatedExperience = profile.experience.filter((_, i) => i !== editingIndex)
        try {
            const updatedProfile = await userService.updateProfile({ experience: updatedExperience })
            setProfile(prev => ({ ...prev, experience: updatedProfile.experience }))
            closeModal()
        } catch (error) {
            console.error('Failed to delete experience', error)
        }
    }

    const handleSaveEducation = async (formData) => {
        let updatedEducation = [...(profile.education || [])]
        if (editingIndex !== null) {
            updatedEducation[editingIndex] = formData
        } else {
            updatedEducation.push(formData)
        }

        try {
            const updatedProfile = await userService.updateProfile({ education: updatedEducation })
            setProfile(prev => ({ ...prev, education: updatedProfile.education }))
            closeModal()
        } catch (error) {
            console.error('Failed to update education', error)
        }
    }

    const handleDeleteEducation = async () => {
        if (editingIndex === null) return
        if (!window.confirm('Are you sure you want to delete this education?')) return

        let updatedEducation = profile.education.filter((_, i) => i !== editingIndex)
        try {
            const updatedProfile = await userService.updateProfile({ education: updatedEducation })
            setProfile(prev => ({ ...prev, education: updatedProfile.education }))
            closeModal()
        } catch (error) {
            console.error('Failed to delete education', error)
        }
    }
    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-[60vh] text-slate-500">
                    <span className="material-icons animate-spin text-3xl mr-2">refresh</span> Loading profile...
                </div>
            </MainLayout>
        )
    }

    if (!profile) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center min-h-[60vh] text-slate-500">
                    User not found.
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <ProfileHeader
                            user={profile}
                            isOwnProfile={isOwnProfile}
                            onEdit={() => setIsEditModalOpen(true)}
                            onMessage={handleMessage}
                            connectionStatus={connectionStatus}
                            onConnect={handleConnect}
                            onUploadAvatar={() => triggerUpload('avatar')}
                            // onUploadCover={() => triggerUpload('cover')} // ProfileHeader needs to implement this
                            uploading={uploading}
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png,image/jpg"
                        />

                        {/* About Section */}
                        {profile.about && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About</h2>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                    {profile.about}
                                </p>
                            </div>
                        )}

                        <Experience
                            experiences={profile.experience || []}
                            isOwnProfile={isOwnProfile}
                            onAdd={() => openModal('experience')}
                            onEdit={(item, index) => openModal('experience', item, index)}
                        />

                        {/* Education Section */}
                        <Education 
                            education={profile.education || []}
                            isOwnProfile={isOwnProfile}
                            onAdd={() => openModal('education')}
                            onEdit={(item, index) => openModal('education', item, index)}
                        />

                        {/* Skills Section */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skills</h2>
                                {isOwnProfile && (
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-icons">edit</span>
                                    </button>
                                )}
                            </div>
                            <Skills skills={profile.skills || []} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block lg:col-span-4 pl-4">
                        <div className="sticky top-24">
                            <SidebarRight />
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Info Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Headline</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                            value={editForm.headline}
                            onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white h-32 resize-none"
                            value={editForm.about}
                            onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills (comma separated)</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                            value={editForm.skills}
                            onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                            placeholder="React, Node.js, Design..."
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg shadow-primary/30"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Experience Modal */}
            <ExperienceModal
                isOpen={activeModal === 'experience'}
                onClose={closeModal}
                onSave={handleSaveExperience}
                initialData={editingItem}
                onDelete={handleDeleteExperience}
            />

            {/* Education Modal */}
            <EducationModal
                isOpen={activeModal === 'education'}
                onClose={closeModal}
                onSave={handleSaveEducation}
                initialData={editingItem}
                onDelete={handleDeleteEducation}
            />
        </MainLayout>
    )
}

export default Profile
