import React, { useState } from 'react';
import { PlusCircle, ReceiptText, DollarSign, User, Loader2 } from 'lucide-react';

const ExpenseForm = ({ members, onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        setIsSubmitting(true);
        
        setTimeout(() => {
            onAddExpense({
                id: Date.now(),
                description,
                amount: parseFloat(amount),
                paidBy,
            });

            setDescription('');
            setAmount('');
            setPaidBy('');
            setIsSubmitting(false);
        }, 200);
    };

    if (members.length < 1) return null;

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
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
