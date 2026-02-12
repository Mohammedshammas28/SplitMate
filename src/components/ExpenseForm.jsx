import React, { useState } from 'react';
import { PlusCircle, ReceiptText, DollarSign, User } from 'lucide-react';

const ExpenseForm = ({ members, onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');

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

        onAddExpense({
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            paidBy,
        });

        setDescription('');
        setAmount('');
        setPaidBy('');
    };

    if (members.length < 1) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-6 text-green-600 font-semibold">
                <PlusCircle size={20} />
                <h2>Add New Expense</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <ReceiptText size={14} /> Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Dinner"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <DollarSign size={14} /> Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <User size={14} /> Paid By
                        </label>
                        <select
                            value={paidBy}
                            onChange={(e) => setPaidBy(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                >
                    <PlusCircle size={20} />
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
