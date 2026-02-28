import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

const Landing = () => {
    return (
        <MainLayout>
            <div className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Hero Content */}
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
                                    <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                                    #1 Platform for Growth
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
                                    Accelerate Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Professional Career</span>
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
                                    The all-in-one platform for finding your dream job, expanding your network with industry leaders, and mastering new skills that matter.
                                </p>

                                {/* Search Box (Floating) */}
                                <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-2 max-w-xl relative z-10">
                                    <div className="flex-grow relative flex items-center">
                                        <span className="material-icons absolute left-4 text-slate-400">search</span>
                                        <input className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400 font-medium" placeholder="Job title, skill, or company..." type="text" />
                                    </div>
                                    <div className="h-px sm:h-auto sm:w-px bg-slate-200 dark:bg-slate-600 mx-2 hidden sm:block"></div>
                                    <div className="relative min-w-[140px]">
                                        <select className="w-full pl-3 pr-10 py-3 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white font-medium cursor-pointer appearance-none">
                                            <option>Jobs</option>
                                            <option>People</option>
                                            <option>Courses</option>
                                        </select>
                                        <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">expand_more</span>
                                    </div>
                                    <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md">
                                        Search
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <span>Popular:</span>
                                    <div className="flex flex-wrap gap-2">
                                        <a className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-transparent hover:border-primary/20" href="#">UX Design</a>
                                        <a className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-transparent hover:border-primary/20" href="#">Remote</a>
                                        <a className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary rounded-full transition-colors border border-transparent hover:border-primary/20" href="#">Marketing</a>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Visuals */}
                            <div className="relative hidden lg:block h-[600px]">
                                {/* Abstract Background Decoration */}
                                <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-full blur-3xl opacity-60"></div>

                                {/* Card 1: Main Image */}
                                <div className="absolute top-0 right-0 w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img alt="Diverse group of professionals collaborating in a modern office" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLo741FS6xn3zW2gX3qaSsT6JG-9Sor426Q_J7v8QcCg2401RqXvo-jHt07_WeW0U0nsR177h1dQpVB-YsnH39P7RhuS_SLKxJYObhLI2Q2a2_fhOo5_i-nnINpQgQ1g_4FfJVZ1bkd1G6JS5XrodqBmiJzaTaqHHeaGu3x5oNUIJTx4uD7KSSrcTUYNxhraUvurC8GH7QcXrShJahEjxSjl732l2hZ0OKJBZQqUSo1EXYiwUoWNAERAapdCDs4ob0e_ClxIgfCsQ" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-semibold text-lg">Community Meetups</p>
                                        <p className="text-sm opacity-90">London, UK</p>
                                    </div>
                                </div>

                                {/* Card 2: Floating Notification */}
                                <div className="absolute top-32 left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-[bounce_3s_infinite]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                            <img alt="Portrait of a smiling professional woman" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbI9eAbtkRnQ2JmpK2Z2GUssDl9ybhYWGbV9FaE_0LJ8gCJkdIk4mlX11q_HpI4gOVyqluFvxOLCKRJuJ-WNMLi3GOlSI3VonwN2qdKZDwVAJTsq34-HITlUB7_Yo8rzIsQsH0d3WRRsZPfA8VSG7_xnTuuJKRKj7WNT92lqgMYmQ5-CJjXjrG7x45Sxhrc9su-xTQ6HVU0uBWQTII_mp36mGKkLjsvVbIrcQTp6ewE2uTSzojBqO9ggES5rUZA-1PiOaOY5bnpRo" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">New Message</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">Sarah viewed your profile</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3: Skill Badge */}
                                <div className="absolute bottom-20 left-20 bg-white dark:bg-slate-800 p-4 pr-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition-transform">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                                        <span className="material-icons">verified</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Skill Match</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Bar */}
                <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="h-8 flex items-center font-bold text-xl text-slate-700 dark:text-slate-300"><span className="material-icons mr-2 text-2xl">diamond</span> AcmeCorp</div>
                            <div className="h-8 flex items-center font-bold text-xl text-slate-700 dark:text-slate-300"><span className="material-icons mr-2 text-2xl">change_history</span> Vertex</div>
                            <div className="h-8 flex items-center font-bold text-xl text-slate-700 dark:text-slate-300"><span className="material-icons mr-2 text-2xl">all_inclusive</span> Infinite</div>
                            <div className="h-8 flex items-center font-bold text-xl text-slate-700 dark:text-slate-300"><span className="material-icons mr-2 text-2xl">bolt</span> PowerLabs</div>
                            <div className="h-8 flex items-center font-bold text-xl text-slate-700 dark:text-slate-300"><span className="material-icons mr-2 text-2xl">eco</span> GreenTech</div>
                        </div>
                    </div>
                </section>

                {/* Value Proposition / Features */}
                <section className="py-24 bg-white dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Why Professionals Choose SkillConnect</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">We've reimagined the professional network to focus on what actually matters: your growth, your skills, and genuine connections.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-soft transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-icons text-3xl">work_outline</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Job Matching</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Our AI analyzes your skills and preferences to surface opportunities that align with your long-term career goals, not just your past titles.</p>
                            </div>
                            {/* Feature 2 */}
                            <div className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-soft transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-icons text-3xl">people_outline</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Meaningful Networking</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Connect with mentors and peers based on shared interests and project goals. No cold outreach spam, just genuine collaboration.</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="group p-8 rounded-3xl bg-background-light dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-soft transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-icons text-3xl">school</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Skill Development</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Access curated learning paths and get certified. Show off your verified skills directly on your profile to stand out to recruiters.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl">
                            {/* Decorative Circles */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-black opacity-10 blur-2xl"></div>

                            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to take the next step?</h2>
                                <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">Join 2 million+ professionals who have already accelerated their careers with SkillConnect.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link to="/register" className="bg-white text-primary hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg transform hover:-translate-y-1">
                                        Create Free Profile
                                    </Link>
                                    <Link to="/jobs" className="bg-primary-dark/30 hover:bg-primary-dark/50 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
                                        Explore Jobs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    )
}

export default Landing
