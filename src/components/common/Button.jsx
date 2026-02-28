import React from 'react'
import './Button.css'

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        size !== 'md' ? `btn-${size}` : '',
        fullWidth ? 'btn-full' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}

export default Button
