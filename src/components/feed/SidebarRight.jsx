import React from 'react'

const SidebarRight = () => {
    return (
        <div className="space-y-6">
            {/* People You May Know */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">People you may know</h3>
                    <span className="text-sm text-primary font-medium cursor-pointer hover:underline">See all</span>
                </div>
                <div className="space-y-4">
                    {/* Placeholder Person 1 */}
                    <div className="flex items-start gap-3">
                        <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary cursor-pointer line-clamp-1">Sarah Wilson</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">Product Designer at TechCorp</div>
                            <button className="mt-2 text-xs font-semibold text-primary border border-primary/20 hover:bg-primary/5 px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-icons text-sm">add</span> Connect
                            </button>
                        </div>
                    </div>
                    {/* Placeholder Person 2 */}
                    <div className="flex items-start gap-3">
                        <img
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary cursor-pointer line-clamp-1">James Rodriguez</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">Full Stack Developer</div>
                            <button className="mt-2 text-xs font-semibold text-primary border border-primary/20 hover:bg-primary/5 px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                                <span className="material-icons text-sm">add</span> Connect
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's News */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Today's News</h3>
                    <span className="material-icons text-slate-400 text-sm cursor-pointer">info</span>
                </div>
                <div className="space-y-4">
                    <div className="cursor-pointer group">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-primary"></span>
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary line-clamp-1 transition-colors">Tech hiring stabilizes in Q3</div>
                        </div>
                        <div className="pl-4 text-xs text-slate-500 dark:text-slate-400">Top news • 10,234 readers</div>
                    </div>
                    <div className="cursor-pointer group">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-primary"></span>
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary line-clamp-1 transition-colors">AI tools for productivity</div>
                        </div>
                        <div className="pl-4 text-xs text-slate-500 dark:text-slate-400">Technology • 5,129 readers</div>
                    </div>
                    <div className="cursor-pointer group">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-primary"></span>
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary line-clamp-1 transition-colors">Remote work trends 2024</div>
                        </div>
                        <div className="pl-4 text-xs text-slate-500 dark:text-slate-400">Workplace • 8,902 readers</div>
                    </div>
                </div>
                <button className="w-full mt-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-1 transition-colors">
                    Show more <span className="material-icons text-sm">expand_more</span>
                </button>
            </div>
        </div>
    )
}

export default SidebarRight
