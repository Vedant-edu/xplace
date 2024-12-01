import React from 'react';
import { PlacementData } from '../types';

interface PlacementTableProps {
  data: PlacementData[];
  section: 'entc' | 'scoe' | 'all';
}

export const PlacementTable: React.FC<PlacementTableProps> = ({ data, section }) => {
  const getRelevantCount = (item: PlacementData) => {
    switch (section) {
      case 'entc':
        return item.entc_students;
      case 'scoe':
        return item.scoe_students;
      default:
        return item.total_students;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Package (LPA)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Students Selected
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {item.company_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {item.package}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {getRelevantCount(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};