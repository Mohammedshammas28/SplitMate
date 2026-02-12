import React, { useState } from 'react';
import { Users, UserPlus, X, User } from 'lucide-react';

const GroupSetup = ({ groupName, setGroupName, members, setMembers }) => {
    const [newMember, setNewMember] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const addMember = (e) => {
        e.preventDefault();
        if (newMember.trim() && !members.includes(newMember.trim())) {
            setIsAdding(true);
            setMembers([...members, newMember.trim()]);
            setNewMember('');
            setTimeout(() => setIsAdding(false), 300);
        }
    };

    const removeMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-6 sm:p-8 card-hover">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
                    <Users size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-gray-900 text-lg">Group Settings</h2>
                    <p className="text-xs text-gray-400">Add your friends to split expenses</p>
                </div>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Group Name</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g. Goa Trip 2024"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Add Members</label>
                    <form onSubmit={addMember} className="flex gap-2">
                        <input
                            type="text"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                            placeholder="Friend's name"
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 font-medium"
                        >
                            <UserPlus size={18} />
                            <span className="hidden sm:inline">Add</span>
                        </button>
                    </form>
                </div>

                <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 pl-2 pr-3 py-2 rounded-xl text-sm border border-gray-200 group hover:from-red-50 hover:to-red-100 hover:border-red-200 hover:text-red-600 transition-all duration-200 cursor-pointer animate-slide-in"
                                onClick={() => removeMember(index)}
                            >
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 group-hover:border-red-200 group-hover:bg-red-50 transition-all">
                                    <User size={12} className="text-gray-500 group-hover:text-red-500" />
                                </div>
                                <span className="font-medium">{member}</span>
                                <X size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mr-1" />
                            </div>
                        ))}
                    </div>
                    {members.length === 0 && (
                        <div className="text-center py-8 px-4">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-50 flex items-center justify-center">
                                <Users size={28} className="text-gray-300" />
                            </div>
                            <p className="text-gray-400 text-sm font-medium">No members added yet</p>
                            <p className="text-gray-300 text-xs mt-1">Add friends to start splitting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupSetup;
