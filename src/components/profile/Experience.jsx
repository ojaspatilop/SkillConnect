import React from 'react'

const Experience = ({ experiences, isOwnProfile, onAdd, onEdit }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Experience</h2>
                {isOwnProfile && (
                    <button
                        onClick={onAdd}
                        className="text-slate-400 hover:text-primary transition-colors"
                    >
                        <span className="material-icons">add</span>
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div key={index} className="flex gap-4 group relative">
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                <span className="material-icons text-slate-500 dark:text-slate-400">business</span>
                            </div>
                        </div>
                        <div className="flex-grow pb-6 border-b border-slate-100 dark:border-slate-700/50 group-last:border-none group-last:pb-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{exp.company}</p>
                                </div>
                                {isOwnProfile && (
                                    <button
                                        onClick={() => onEdit(exp, index)}
                                        className="text-slate-400 hover:text-primary transition-colors p-1"
                                    >
                                        <span className="material-icons text-sm">edit</span>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2">
                                {new Date(exp.startDate).getFullYear()} - {' '}
                                {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()} • {exp.location}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience
