import React, { useCallback } from 'react';
import Header from './components/Header';
import GroupSetup from './components/GroupSetup';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [groupName, setGroupName] = useLocalStorage('groupName', '');
  const [members, setMembers] = useLocalStorage('members', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  // Use useCallback for functions passed down to memoized components if needed
  const addExpense = useCallback((newExpense) => {
    setExpenses(prev => [newExpense, ...prev]);
  }, [setExpenses]);

  const deleteExpense = useCallback((id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, [setExpenses]);

  const clearAll = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setGroupName('');
      setMembers([]);
      setExpenses([]);
      localStorage.clear();
    }
  }, [setGroupName, setMembers, setExpenses]);

  const hasData = members.length > 0 || expenses.length > 0;

  return (
    <div className="min-h-screen font-sans pb-20">
      <Header groupName={groupName} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Group Setup */}
          <div className="lg:col-span-4 space-y-6">
            <GroupSetup
              groupName={groupName}
              setGroupName={setGroupName}
              members={members}
              setMembers={setMembers}
            />

            {hasData && (
              <button
                onClick={clearAll}
                className="w-full text-sm text-gray-400 hover:text-red-500 transition-all duration-200 py-3 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl hover:border-red-200 hover:bg-red-50/50 group"
              >
                <svg 
                  className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear all session data
              </button>
            )}
          </div>

          {/* Right Column: Calculations & Form */}
          <div className="lg:col-span-8 space-y-6">
            <Summary
              members={members}
              expenses={expenses}
            />

            <ExpenseForm
              members={members}
              onAddExpense={addExpense}
            />

            <ExpenseList
              expenses={expenses}
              onDeleteExpense={deleteExpense}
            />
          </div>
        </div>
      </main>

      <footer className="text-center py-12 text-gray-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-200"></div>
          <span className="text-gray-300">•</span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-200"></div>
        </div>
        <p className="font-medium">Built with SplitMate &bull; {new Date().getFullYear()}</p>
        <p className="text-xs text-gray-300 mt-1">Simplifying group expenses</p>
      </footer>
    </div>
  );
}

export default App;
