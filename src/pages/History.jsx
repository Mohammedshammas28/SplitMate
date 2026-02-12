import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from '../components/ExpenseList';
import { ArrowLeft, Plus } from 'lucide-react';

const History = ({ expenses, onDeleteExpense, groupName }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Expense History</h1>
              <p className="text-sm text-gray-500">{groupName} · {expenses.length} expenses</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      {/* Expense List */}
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={onDeleteExpense}
      />
    </div>
  );
};

export default History;
