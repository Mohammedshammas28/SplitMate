import React from 'react';
import { Wallet, Sparkles } from 'lucide-react';

const Header = ({ groupName }) => {
    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 sm:p-3 rounded-2xl text-white shadow-lg shadow-blue-500/25">
                            <Wallet size={24} className="sm:w-7 sm:h-7" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                            SplitMate
                        </h1>
                        {groupName && (
                            <p className="text-xs text-gray-500 font-medium -mt-0.5 truncate max-w-[150px] sm:max-w-[200px]">
                                {groupName}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-100">
                    <Sparkles size={14} className="text-blue-500" />
                    <span className="hidden sm:inline">Smart Bill Splitter</span>
                    <span className="sm:hidden">Splitter</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
