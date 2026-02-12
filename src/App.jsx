import React, { useCallback, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import History from './pages/History';
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

  // Mark all settlements as settled (clear expenses but keep members)
  const markAllSettled = useCallback(() => {
    if (window.confirm('Mark all settlements as completed? This will clear all expenses for this group.')) {
      updateCurrentGroup({ expenses: [] });
    }
  }, [updateCurrentGroup]);

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
    <BrowserRouter>
      <div className="min-h-screen font-sans pb-24">
        <Header groupName={currentGroup?.name} />

        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  groups={groups}
                  currentGroupId={currentGroupId}
                  currentGroup={currentGroup}
                  onSelectGroup={setCurrentGroupId}
                  onCreateGroup={handleCreateGroup}
                  onDeleteGroup={handleDeleteGroup}
                  setGroupName={setGroupName}
                  setMembers={setMembers}
                  clearCurrentGroup={clearCurrentGroup}
                  markAllSettled={markAllSettled}
                  hasData={hasData}
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <AddExpense 
                  members={currentGroup?.members || []}
                  onAddExpense={addExpense}
                  groupName={currentGroup?.name}
                />
              } 
            />
            <Route 
              path="/history" 
              element={
                <History 
                  expenses={currentGroup?.expenses || []}
                  onDeleteExpense={deleteExpense}
                  groupName={currentGroup?.name}
                />
              } 
            />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
