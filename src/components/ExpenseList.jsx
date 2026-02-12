import React from 'react';
import { Trash2, History } from 'lucide-react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
    if (expenses.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 mb-6">
                <History size={48} className="mx-auto mb-3 opacity-20" />
                <p>Your expense history will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 px-1 flex items-center gap-2">
                <History size={20} className="text-gray-400" />
                Recent Expenses
            </h2>
            <div className="grid grid-cols-1 gap-3">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl font-bold">
                                ₹{expense.amount.toFixed(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{expense.description}</h3>
                                <p className="text-sm text-gray-500">Paid by <span className="text-gray-900 font-medium">{expense.paidBy}</span></p>
                            </div>
                        </div>
                        <button
                            onClick={() => onDeleteExpense(expense.id)}
                            className="text-gray-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
