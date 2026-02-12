import React, { useState, useEffect } from 'react';
import { PlusCircle, ReceiptText, DollarSign, User, Loader2, Tag, Split, Users } from 'lucide-react';

const CATEGORIES = [
    { value: 'food', label: '🍔 Food', color: 'orange' },
    { value: 'travel', label: '✈️ Travel', color: 'blue' },
    { value: 'stay', label: '🏨 Stay', color: 'purple' },
    { value: 'utilities', label: '⚡ Utilities', color: 'yellow' },
    { value: 'other', label: '📦 Other', color: 'gray' },
];

const ExpenseForm = ({ members, onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [category, setCategory] = useState('other');
    const [splitType, setSplitType] = useState('equal'); // 'equal' or 'custom'
    const [customSplits, setCustomSplits] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize custom splits when members change
    useEffect(() => {
        const initialSplits = {};
        members.forEach(member => {
            initialSplits[member] = '';
        });
        setCustomSplits(initialSplits);
    }, [members]);

    const handleCustomSplitChange = (member, value) => {
        setCustomSplits(prev => ({
            ...prev,
            [member]: value
        }));
    };

    const getTotalCustomSplit = () => {
        return Object.values(customSplits).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount || !paidBy) {
            alert('Please fill all fields');
            return;
        }
        if (parseFloat(amount) <= 0) {
            alert('Amount must be positive');
            return;
        }

        // Validate custom splits
        if (splitType === 'custom') {
            const totalCustom = getTotalCustomSplit();
            const expenseAmount = parseFloat(amount);
            if (Math.abs(totalCustom - expenseAmount) > 0.01) {
                alert(`Custom splits must equal the total amount (₹${expenseAmount}). Current total: ₹${totalCustom.toFixed(2)}`);
                return;
            }
        }

        setIsSubmitting(true);
        
        setTimeout(() => {
            const expenseData = {
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                paidBy,
                category,
                splitType,
            };

            // Add custom splits if using custom split type
            if (splitType === 'custom') {
                expenseData.customSplits = { ...customSplits };
            }

            onAddExpense(expenseData);

            setDescription('');
            setAmount('');
            setPaidBy('');
            setCategory('other');
            setSplitType('equal');
            const resetSplits = {};
            members.forEach(member => {
                resetSplits[member] = '';
            });
            setCustomSplits(resetSplits);
            setIsSubmitting(false);
        }, 200);
    };

    if (members.length < 1) return null;

    const remainingAmount = splitType === 'custom' ? parseFloat(amount || 0) - getTotalCustomSplit() : 0;

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-6 sm:p-8 card-hover">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                    <PlusCircle size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-gray-900 text-lg">Add New Expense</h2>
                    <p className="text-xs text-gray-400">Track every payment</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <ReceiptText size={14} className="text-gray-400" /> 
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Dinner"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <DollarSign size={14} className="text-gray-400" /> 
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <Tag size={14} className="text-gray-400" /> 
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <User size={14} className="text-gray-400" /> 
                            Paid By
                        </label>
                        <select
                            value={paidBy}
                            onChange={(e) => setPaidBy(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
                        >
                            <option value="">Select Member</option>
                            {members.map((member, index) => (
                                <option key={index} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Split Type Selection */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                        <Split size={14} className="text-gray-400" /> 
                        Split Type
                    </label>
                    <div className="flex gap-3 mb-4">
                        <button
                            type="button"
                            onClick={() => setSplitType('equal')}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                splitType === 'equal'
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <Users size={16} />
                            Equal Split
                        </button>
                        <button
                            type="button"
                            onClick={() => setSplitType('custom')}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                splitType === 'custom'
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <Split size={16} />
                            Custom Split
                        </button>
                    </div>

                    {/* Custom Split Inputs */}
                    {splitType === 'custom' && amount && (
                        <div className="space-y-3 animate-fadeIn">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Assign amounts to each member:</span>
                                <span className={`font-semibold ${Math.abs(remainingAmount) < 0.01 ? 'text-emerald-600' : 'text-orange-500'}`}>
                                    Remaining: ₹{remainingAmount.toFixed(2)}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {members.map((member) => (
                                    <div key={member} className="relative">
                                        <label className="block text-xs font-medium text-gray-500 mb-1 truncate">{member}</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={customSplits[member] || ''}
                                                onChange={(e) => handleCustomSplitChange(member, e.target.value)}
                                                placeholder="0"
                                                step="0.01"
                                                className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-emerald-500 focus:outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-emerald-400 disabled:to-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <PlusCircle size={20} />
                            Add Expense
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
