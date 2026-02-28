import React, { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'

const Learning = () => {
    const [activeTab, setActiveTab] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [myCourses, setMyCourses] = useState([
        {
            id: 2,
            title: 'UX Design Fundamentals',
            instructor: 'Google',
            rating: 4.8,
            students: '45k',
            duration: '12h 15m',
            image: 'https://ui-avatars.com/api/?name=UX&background=ff6b6b&color=fff&size=200',
            progress: 35,
            category: 'Design'
        }
    ])

    const allCourses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            instructor: 'Sarah Drasner',
            rating: 4.9,
            students: '12k',
            duration: '4h 30m',
            image: 'https://ui-avatars.com/api/?name=React&background=61dafb&color=fff&size=200',
            progress: 0,
            category: 'Development',
            description: 'Master advanced React patterns including Compound Components, Control Props, and Custom Hooks.'
        },
        // ID 2 is in myCourses
        {
            id: 3,
            title: 'AWS Certified Solutions Architect',
            instructor: 'Stephane Maarek',
            rating: 4.9,
            students: '80k',
            duration: '22h 40m',
            image: 'https://ui-avatars.com/api/?name=AWS&background=ff9900&color=fff&size=200',
            progress: 0,
            category: 'Cloud',
            description: 'Comprehensive guide to passing the AWS Solutions Architect Associate exam.'
        },
        {
            id: 4,
            title: 'Product Management 101',
            instructor: 'Product School',
            rating: 4.7,
            students: '20k',
            duration: '5h 50m',
            image: 'https://ui-avatars.com/api/?name=PM&background=4cd137&color=fff&size=200',
            progress: 0,
            category: 'Business',
            description: 'Learn the fundamentals of product management from industry experts.'
        },
        {
            id: 5,
            title: 'Data Science Bootcamp',
            instructor: 'Jose Portilla',
            rating: 4.8,
            students: '55k',
            duration: '28h 15m',
            image: 'https://ui-avatars.com/api/?name=DS&background=9b59b6&color=fff&size=200',
            progress: 0,
            category: 'Data Science',
            description: 'Complete Data Science training: Mathematics, Statistics, Python, Advanced Statistics in Python.'
        }
    ]

    const [availableCourses, setAvailableCourses] = useState(allCourses.filter(c => c.id !== 2))

    const handleEnroll = (course) => {
        if (myCourses.find(c => c.id === course.id)) return

        setMyCourses([...myCourses, { ...course, progress: 0 }])
        setAvailableCourses(availableCourses.filter(c => c.id !== course.id))
        setSelectedCourse(null)
    }

    const handleProgressUpdate = (id, newProgress) => {
        setMyCourses(myCourses.map(c => c.id === id ? { ...c, progress: Math.min(100, Math.max(0, newProgress)) } : c))
    }

    const filteredCourses = availableCourses.filter(course => {
        const matchesTab = activeTab === 'all' || course.category.toLowerCase() === activeTab
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })

    return (
        <MainLayout>
            <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/20 via-primary/5 to-transparent"></div>

                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Skills</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                        Discover expert-led courses and advance your career with real-world skills.
                    </p>

                    <div className="w-full max-w-2xl relative group">
                        <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-md group-hover:bg-primary/40 transition-all duration-300"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                            <span className="material-icons pl-6 text-slate-300 text-2xl">search</span>
                            <input
                                type="text"
                                placeholder="Search for courses, skills, or instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-4 pr-6 py-4 bg-transparent text-white placeholder-slate-300 focus:outline-none text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* My Learning */}
                {myCourses.length > 0 && (
                    <div className="mb-16 animate-fade-in">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-icons text-primary">school</span>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Learning</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourses.map(course => (
                                <div key={course.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex gap-5 group">
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                        <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">{course.title}</h3>
                                            <p className="text-xs text-slate-500 mt-1">{course.instructor}</p>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                                <span>Progress</span>
                                                <span className="font-medium text-primary">{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 relative overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={() => handleProgressUpdate(course.id, course.progress + 10)}
                                                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                                                >
                                                    +10% Progress
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories */}
                <div className="mb-10 sticky top-20 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:static sm:bg-transparent sm:p-0">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {['All', 'Development', 'Design', 'Business', 'Marketing', 'Cloud', 'Data Science'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat.toLowerCase())}
                                className={`px-6 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 border ${activeTab === cat.toLowerCase()
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 transform scale-105'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <div
                                key={course.id}
                                onClick={() => setSelectedCourse(course)}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                                        {course.category}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                                        <button className="bg-white text-primary font-bold py-2 px-6 rounded-full shadow-lg hover:bg-slate-50 transition-colors pointer-events-none">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">{course.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{course.instructor}</p>

                                    <div className="mt-auto">
                                        <div className="flex items-center gap-1.5 mb-4">
                                            <span className="font-bold text-yellow-500">{course.rating}</span>
                                            <div className="flex text-yellow-400 text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="material-icons text-[16px]">
                                                        {i < Math.floor(course.rating) ? 'star' : 'star_border'}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-400 ml-1">({course.students})</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                                <span className="material-icons text-sm">schedule</span> {course.duration}
                                            </span>
                                            <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">Free</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-icons text-slate-400 text-3xl">search_off</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses found</h3>
                            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Course Details Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                        <div className="relative h-64">
                            <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <span className="material-icons">close</span>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">
                                    {selectedCourse.category}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedCourse.title}</h2>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${selectedCourse.instructor}&background=random`}
                                    className="w-12 h-12 rounded-full"
                                    alt={selectedCourse.instructor}
                                />
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Instructor</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{selectedCourse.instructor}</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                                        <span className="material-icons text-yellow-500 text-sm">star</span>
                                        {selectedCourse.rating}
                                    </div>
                                    <p className="text-xs text-slate-500">{selectedCourse.students} students</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">About this course</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {selectedCourse.description || `Learn the essentials of ${selectedCourse.title} in this comprehensive course designed for ${selectedCourse.category} professionals. Covers everything from basics to advanced topics.`}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                        <span className="material-icons text-lg">schedule</span>
                                        <span className="text-xs font-bold uppercase">Duration</span>
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white">{selectedCourse.duration}</p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                        <span className="material-icons text-lg">school</span>
                                        <span className="text-xs font-bold uppercase">Certificate</span>
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white">Yes, Included</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleEnroll(selectedCourse)}
                                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02]"
                                >
                                    Enroll Now - Free
                                </button>
                                <button className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-icons text-slate-500 dark:text-slate-400">bookmark_border</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default Learning
