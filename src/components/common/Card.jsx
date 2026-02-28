import React from 'react'

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div
            className={`
                bg-white dark:bg-slate-800 
                p-6 rounded-2xl 
                border border-slate-100 dark:border-slate-700 
                shadow-xl shadow-slate-200/50 dark:shadow-none
                ${hover ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''} 
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    )
}

export default Card
