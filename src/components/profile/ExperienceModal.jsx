import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'

const ExperienceModal = ({ isOpen, onClose, onSave, initialData, onDelete }) => {
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
                endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : ''
            })
        } else {
            setFormData({
                role: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            })
        }
    }, [initialData, isOpen])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Experience' : 'Add Experience'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title / Role</label>
                    <input
                        type="text"
                        name="role"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                        value={formData.role || ''} // Handle undefined
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company</label>
                    <input
                        type="text"
                        name="company"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                        value={formData.company || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                        value={formData.location || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="current"
                        id="current"
                        checked={formData.current || false}
                        onChange={handleChange}
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="current" className="text-sm font-medium text-slate-700 dark:text-slate-300">I am currently working in this role</label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            required
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                            value={formData.startDate || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            disabled={formData.current}
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white disabled:opacity-50"
                            value={formData.endDate || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white h-32 resize-none"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="pt-4 flex justify-between">
                    {initialData ? (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
                        >
                            Delete Experience
                        </button>
                    ) : <div></div>}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-lg shadow-primary/30"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default ExperienceModal
