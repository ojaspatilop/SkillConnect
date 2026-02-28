import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="font-bold text-xl text-slate-900 dark:text-white">SkillConnect</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">Making professional growth accessible, transparent, and human-centric for everyone.</p>
                        <div className="flex space-x-4">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons">facebook</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons">alternate_email</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons">work</span></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Browse Jobs</a></li>
                            <li><a class="hover:text-primary transition-colors" href="#">Browse Talent</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Learning Hub</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Career Guide</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                    <p>© 2026 SkillConnect Inc. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
