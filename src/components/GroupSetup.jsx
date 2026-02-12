import React, { useState } from 'react';
import { Users, UserPlus, X } from 'lucide-react';

const GroupSetup = ({ groupName, setGroupName, members, setMembers }) => {
    const [newMember, setNewMember] = useState('');

    const addMember = (e) => {
        e.preventDefault();
        if (newMember.trim() && !members.includes(newMember.trim())) {
            setMembers([...members, newMember.trim()]);
            setNewMember('');
        }
    };

    const removeMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-6 text-blue-600 font-semibold">
                <Users size={20} />
                <h2>Group Settings</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g. Goa Trip 2024"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Members</label>
                    <form onSubmit={addMember} className="flex gap-2">
                        <input
                            type="text"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                            placeholder="Friend's name"
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all active:scale-95"
                        >
                            <UserPlus size={18} />
                            <span>Add</span>
                        </button>
                    </form>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm border border-gray-200 group hover:bg-red-50 hover:border-red-100 hover:text-red-700 transition-all cursor-default"
                            onClick={() => removeMember(index)}
                        >
                            <span>{member}</span>
                            <X size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                    {members.length === 0 && (
                        <p className="text-gray-400 text-sm italic">No members added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupSetup;
