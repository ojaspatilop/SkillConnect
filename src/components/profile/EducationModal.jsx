import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'

const EducationModal = ({ isOpen, onClose, onSave, initialData, onDelete }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
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
                school: '',
                degree: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                description: ''
            })
        }
    }, [initialData, isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Education' : 'Add Education'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">School / University</label>
                    <input
                        type="text"
                        name="school"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                        value={formData.school || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Degree</label>
                    <input
                        type="text"
                        name="degree"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                        value={formData.degree || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Field of Study</label>
                    <input
                        type="text"
                        name="fieldOfStudy"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                        value={formData.fieldOfStudy || ''}
                        onChange={handleChange}
                    />
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
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date (or expected)</label>
                        <input
                            type="date"
                            name="endDate"
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
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
                            Delete Education
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

export default EducationModal
