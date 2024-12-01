import React from 'react';

interface TabFilterProps {
  activeTab: 'entc' | 'scoe' | 'all';
  onTabChange: (tab: 'entc' | 'scoe' | 'all') => void;
}

export const TabFilter: React.FC<TabFilterProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-3xl">
      {(['entc', 'scoe', 'all'] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 m-1 py-1 rounded-3xl transition-colors duration-300 ${
            activeTab === tab
              ? 'bg-blue-800 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}