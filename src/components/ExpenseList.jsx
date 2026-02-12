import React, { useState } from 'react';
import { Trash2, History, Receipt, Calendar } from 'lucide-react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (id) => {
        setDeletingId(id);
        setTimeout(() => {
            onDeleteExpense(id);
            setDeletingId(null);
        }, 300);
    };

    if (expenses.length === 0) {
        return (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-8 sm:p-12 text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <Receipt size={36} className="text-gray-300 empty-state" />
                </div>
                <h3 className="text-gray-700 font-semibold mb-1">No expenses yet</h3>
                <p className="text-gray-400 text-sm">Your expense history will appear here</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-300">
                    <div className="w-8 h-[1px] bg-gray-200"></div>
                    <span>Add your first expense above</span>
                    <div className="w-8 h-[1px] bg-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <div className="bg-gradient-to-br from-violet-500 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-violet-500/20">
                        <History size={16} />
                    </div>
                    Recent Expenses
                </h2>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                    {expenses.length} {expenses.length === 1 ? 'item' : 'items'}
                </span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                {expenses.map((expense, index) => (
                    <div
                        key={expense.id}
                        className={`expense-item bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-200/30 border border-gray-100/80 p-4 sm:p-5 flex items-center justify-between hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group ${
                            deletingId === expense.id ? 'animate-fade-out-down opacity-0' : ''
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 min-w-[60px] sm:min-w-[70px] text-center">
                                ₹{expense.amount.toFixed(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{expense.description}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                                    Paid by 
                                    <span className="text-gray-700 font-medium bg-gray-100 px-2 py-0.5 rounded-md text-xs">
                                        {expense.paidBy}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(expense.id)}
                            disabled={deletingId === expense.id}
                            className="text-gray-300 hover:text-red-500 p-3 rounded-xl hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 active:scale-90"
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
