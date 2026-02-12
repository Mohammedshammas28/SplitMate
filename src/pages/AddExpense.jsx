import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { ArrowLeft } from 'lucide-react';

const AddExpense = ({ members, onAddExpense, groupName }) => {
  const navigate = useNavigate();

  const handleAddExpense = (expense) => {
    onAddExpense(expense);
    navigate('/history');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add Expense</h1>
            <p className="text-sm text-gray-500">Adding to {groupName}</p>
          </div>
        </div>
      </div>

      {/* Expense Form */}
      {members.length > 0 ? (
        <ExpenseForm
          members={members}
          onAddExpense={handleAddExpense}
        />
      ) : (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100/80 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-gray-700 font-semibold mb-2">No members yet</h3>
          <p className="text-gray-400 text-sm mb-4">Add members to your group first before adding expenses</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
