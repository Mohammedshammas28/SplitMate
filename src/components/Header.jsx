import React from 'react';
import { Wallet } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <Wallet size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">SplitMate</h1>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Simple Bill Splitter
                </div>
            </div>
        </header>
    );
};

export default Header;
