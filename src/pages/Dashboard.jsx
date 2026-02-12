import React from 'react';
import GroupSelector from '../components/GroupSelector';
import GroupSetup from '../components/GroupSetup';
import Summary from '../components/Summary';

const Dashboard = ({ 
  groups, 
  currentGroupId, 
  currentGroup,
  onSelectGroup, 
  onCreateGroup, 
  onDeleteGroup,
  setGroupName,
  setMembers,
  clearCurrentGroup,
  markAllSettled,
  hasData 
}) => {
  return (
    <div className="space-y-6">
      {/* Group Selector */}
      <GroupSelector
        groups={groups}
        currentGroupId={currentGroupId}
        onSelectGroup={onSelectGroup}
        onCreateGroup={onCreateGroup}
        onDeleteGroup={onDeleteGroup}
      />

      {/* Group Setup */}
      <GroupSetup
        groupName={currentGroup?.name || ''}
        setGroupName={setGroupName}
        members={currentGroup?.members || []}
        setMembers={setMembers}
      />

      {/* Summary */}
      <Summary
        members={currentGroup?.members || []}
        expenses={currentGroup?.expenses || []}
        onSettleAll={markAllSettled}
      />

      {/* Clear Data Button */}
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
  );
};

export default Dashboard;
