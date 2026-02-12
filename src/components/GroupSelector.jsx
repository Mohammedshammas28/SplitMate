import React, { useState } from 'react';
import { Plus, ChevronDown, Trash2, FolderOpen } from 'lucide-react';

const GroupSelector = ({ groups, currentGroupId, onSelectGroup, onCreateGroup, onDeleteGroup }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNewGroupInput, setShowNewGroupInput] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const currentGroup = groups.find(g => g.id === currentGroupId);

    const handleCreateGroup = (e) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            onCreateGroup(newGroupName.trim());
            setNewGroupName('');
            setShowNewGroupInput(false);
            setIsOpen(false);
        }
    };

    const handleDeleteGroup = (e, groupId) => {
        e.stopPropagation();
        if (window.confirm('Delete this group and all its data?')) {
            onDeleteGroup(groupId);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100/80 p-4 hover:shadow-xl transition-all duration-200"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                        <FolderOpen size={18} />
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-gray-400 font-medium">Current Group</p>
                        <p className="font-semibold text-gray-900">
                            {currentGroup?.name || 'Select a group'}
                        </p>
                    </div>
                </div>
                <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                    <div className="max-h-64 overflow-y-auto">
                        {groups.map((group) => (
                            <div
                                key={group.id}
                                onClick={() => {
                                    onSelectGroup(group.id);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors group ${
                                    group.id === currentGroupId 
                                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                            >
                                <div>
                                    <p className="font-medium text-gray-900">{group.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {group.members.length} members · {group.expenses.length} expenses
                                    </p>
                                </div>
                                {groups.length > 1 && (
                                    <button
                                        onClick={(e) => handleDeleteGroup(e, group.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 p-3">
                        {showNewGroupInput ? (
                            <form onSubmit={handleCreateGroup} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="Group name"
                                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewGroupInput(false);
                                        setNewGroupName('');
                                    }}
                                    className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setShowNewGroupInput(true)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors font-medium text-sm"
                            >
                                <Plus size={18} />
                                Create New Group
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop to close dropdown */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default GroupSelector;
