import React, { useCallback, useMemo } from 'react';
import Header from './components/Header';
import GroupSelector from './components/GroupSelector';
import GroupSetup from './components/GroupSetup';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import { useLocalStorage } from './hooks/useLocalStorage';

// Helper to create a new group
const createNewGroup = (name) => ({
  id: Date.now().toString(),
  name: name || 'New Group',
  members: [],
  expenses: []
});

function App() {
  // Store all groups
  const [groups, setGroups] = useLocalStorage('splitmate_groups', [createNewGroup('My First Group')]);
  const [currentGroupId, setCurrentGroupId] = useLocalStorage('splitmate_currentGroup', groups[0]?.id);

  // Get current group data
  const currentGroup = useMemo(() => 
    groups.find(g => g.id === currentGroupId) || groups[0],
    [groups, currentGroupId]
  );

  // Update current group helper
  const updateCurrentGroup = useCallback((updates) => {
    setGroups(prev => prev.map(g => 
      g.id === currentGroupId ? { ...g, ...updates } : g
    ));
  }, [currentGroupId, setGroups]);

  // Group name setter
  const setGroupName = useCallback((name) => {
    updateCurrentGroup({ name });
  }, [updateCurrentGroup]);

  // Members setter
  const setMembers = useCallback((members) => {
    updateCurrentGroup({ members });
  }, [updateCurrentGroup]);

  // Add expense
  const addExpense = useCallback((newExpense) => {
    setGroups(prev => prev.map(g => 
      g.id === currentGroupId 
        ? { ...g, expenses: [newExpense, ...g.expenses] }
        : g
    ));
  }, [currentGroupId, setGroups]);

  // Delete expense
  const deleteExpense = useCallback((id) => {
    setGroups(prev => prev.map(g => 
      g.id === currentGroupId 
        ? { ...g, expenses: g.expenses.filter(exp => exp.id !== id) }
        : g
    ));
  }, [currentGroupId, setGroups]);

  // Create new group
  const handleCreateGroup = useCallback((name) => {
    const newGroup = createNewGroup(name);
    setGroups(prev => [...prev, newGroup]);
    setCurrentGroupId(newGroup.id);
  }, [setGroups, setCurrentGroupId]);

  // Delete group
  const handleDeleteGroup = useCallback((groupId) => {
    setGroups(prev => {
      const filtered = prev.filter(g => g.id !== groupId);
      if (filtered.length === 0) {
        const newGroup = createNewGroup('My Group');
        return [newGroup];
      }
      return filtered;
    });
    if (currentGroupId === groupId) {
      setCurrentGroupId(groups.find(g => g.id !== groupId)?.id || groups[0]?.id);
    }
  }, [groups, currentGroupId, setGroups, setCurrentGroupId]);

  // Clear current group data
  const clearCurrentGroup = useCallback(() => {
    if (window.confirm('Clear all data for this group?')) {
      updateCurrentGroup({ members: [], expenses: [] });
    }
  }, [updateCurrentGroup]);

  const hasData = currentGroup?.members?.length > 0 || currentGroup?.expenses?.length > 0;

  return (
    <div className="min-h-screen font-sans pb-20">
      <Header groupName={currentGroup?.name} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Group Setup */}
          <div className="lg:col-span-4 space-y-6">
            {/* Group Selector */}
            <GroupSelector
              groups={groups}
              currentGroupId={currentGroupId}
              onSelectGroup={setCurrentGroupId}
              onCreateGroup={handleCreateGroup}
              onDeleteGroup={handleDeleteGroup}
            />

            <GroupSetup
              groupName={currentGroup?.name || ''}
              setGroupName={setGroupName}
              members={currentGroup?.members || []}
              setMembers={setMembers}
            />

            {hasData && (
              <button
                onClick={clearCurrentGroup}
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
                Clear group data
              </button>
            )}
          </div>

          {/* Right Column: Calculations & Form */}
          <div className="lg:col-span-8 space-y-6">
            <Summary
              members={currentGroup?.members || []}
              expenses={currentGroup?.expenses || []}
            />

            <ExpenseForm
              members={currentGroup?.members || []}
              onAddExpense={addExpense}
            />

            <ExpenseList
              expenses={currentGroup?.expenses || []}
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
