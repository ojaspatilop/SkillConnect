import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Card from '../common/Card'
import { FiBookmark } from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = () => {
    const { user } = useAuth()

    if (!user) return null

    return (
        <aside className="sidebar">
            <Card className="profile-card">
                <div className="sidebar-cover"></div>
                <img src={user.avatar} alt={user.name} className="sidebar-avatar" />

                <div className="sidebar-info">
                    <div className="sidebar-name">{user.name}</div>
                    <div className="sidebar-headline">{user.headline}</div>
                </div>

                <div className="sidebar-stats">
                    <div className="sidebar-stat">
                        <span className="stat-label">Profile viewers</span>
                        <span className="stat-value">42</span>
                    </div>
                    <div className="sidebar-stat">
                        <span className="stat-label">Post impressions</span>
                        <span className="stat-value">1,204</span>
                    </div>
                </div>

                <div className="sidebar-item">
                    <FiBookmark />
                    <span>Saved Items</span>
                </div>
            </Card>
        </aside>
    )
}

export default Sidebar
