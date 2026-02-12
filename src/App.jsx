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
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Group Setup */}
          <div className="lg:col-span-4 space-y-4">
            <GroupSetup
              groupName={groupName}
              setGroupName={setGroupName}
              members={members}
              setMembers={setMembers}
            />

            {hasData && (
              <button
                onClick={clearAll}
                className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-2 flex items-center justify-center gap-1 border border-dashed border-gray-200 rounded-lg hover:border-red-200"
              >
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
        <p>Built with SplitMate &bull; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
