import React from 'react';
import { PlacementData } from '../types';
import { Users } from 'lucide-react';
interface PlacementCardProps {
  data: PlacementData;
  section: 'entc' | 'scoe' | 'all';
}

export const PlacementCard: React.FC<PlacementCardProps> = ({ data, section }) => {
  const getRelevantCount = () => {
    switch (section) {
      case 'entc':
        return data.entc_students;
      case 'scoe':
        return data.scoe_students;
      default:
        return data.total_students;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md px-5 py-3 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div> */}
          <h3 className="text-lg font-semibold">{data.company_name}</h3>
        </div>   
        <div className="flex items-center">
          <Users />
          <span className="font-semibold text-lg ml-2">{getRelevantCount()}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">

          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
          ₹{data.package} LPA
        </span>
        {section === 'all' && (
         <div className="pt-2 border-t dark:border-gray-700">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          <span className="bg-purple-100 dark:bg-purple-900/30 rounded-full px-2 py-1">SCoE : {data.scoe_students}</span> | <span className="bg-green-100 dark:bg-green-900/30 rounded-full px-2 py-1">ENTC : {data.entc_students}</span>
        </span>
      </div>
    </div>
        )}
        </div>
        
        
      </div>
    </div>
  );
};