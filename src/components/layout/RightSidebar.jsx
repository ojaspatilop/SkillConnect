import React from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import { FiPlus } from 'react-icons/fi'
import './RightSidebar.css'

const RightSidebar = () => {
    const recommendations = [
        { id: 1, name: 'Sarah Wilson', desc: 'Product Designer at DesignCo', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random' },
        { id: 2, name: 'Tech Insider', desc: 'Latest tech news and insights', avatar: 'https://ui-avatars.com/api/?name=Tech+Insider&background=random' },
        { id: 3, name: 'React Developers', desc: 'Community for React devs', avatar: 'https://ui-avatars.com/api/?name=React+Devs&background=random' },
    ]

    return (
        <aside className="right-sidebar">
            <Card>
                <h3 className="recommendations-title">Add to your feed</h3>
                <div className="recommendations-list">
                    {recommendations.map(rec => (
                        <div key={rec.id} className="recommendation-item">
                            <img src={rec.avatar} alt={rec.name} className="rec-avatar" />
                            <div className="rec-info">
                                <div className="rec-name">{rec.name}</div>
                                <div className="rec-desc">{rec.desc}</div>
                                <Button variant="outline" size="sm" style={{ marginTop: '0.5rem' }}>
                                    <FiPlus /> Follow
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" size="sm" fullWidth style={{ marginTop: '0.5rem' }}>
                    View all recommendations
                </Button>
            </Card>
        </aside>
    )
}

export default RightSidebar
