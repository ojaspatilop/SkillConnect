import React from 'react'

const Skills = ({ skills }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-600">
                        {skill}
                    </span>
                ))
            ) : (
                <p className="text-slate-500 italic">No skills listed.</p>
            )}
        </div>
    )
}

export default Skills
