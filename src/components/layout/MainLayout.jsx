import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen blob-bg text-slate-800 dark:text-slate-100 font-display flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
