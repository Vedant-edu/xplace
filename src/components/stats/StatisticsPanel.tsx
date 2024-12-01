import React from 'react';
import { PlacementData } from '../../types';

interface StatisticsPanelProps {
  data: PlacementData[];
  activeTab: 'entc' | 'scoe' | 'all';
  totalOffers: number;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  data,
  activeTab,
  totalOffers,
}) => {
  const getBgColorClass = () => {
    switch (activeTab) {
      case 'entc':
        return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'scoe':
        return 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className=" rounded-lg shadow my-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg flex items-center justify-between ${getBgColorClass()}`}>
          <p className="text-sm">Total Offers</p>
          <p className="text-2xl font-bold">{totalOffers}</p>
        </div>
        
        {activeTab === 'all' && (
          <>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-between">
              <p className="text-sm text-green-600 dark:text-green-400">ENTC Students</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {data.reduce((acc, curr) => acc + curr.entc_students, 0)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-between">
              <p className="text-sm text-purple-600 dark:text-purple-400">SCoE Students</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data.reduce((acc, curr) => acc + curr.scoe_students, 0)}
              </p>
            </div>
          </>
        )} <hr className="sm:hidden" />
      </div>
    </div>
  );
};