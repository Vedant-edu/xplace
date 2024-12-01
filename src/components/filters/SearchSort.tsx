import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

interface SearchSortProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'recent' | 'package' | 'students';
  onSortChange: (option: 'recent' | 'package' | 'students') => void;
}

export const SearchSort: React.FC<SearchSortProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'package', label: 'Package (High to Low)' },
    { value: 'students', label: 'Number of Students' },
  ] as const;

  return (
    <>
      
{/* <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search companies..."
          className="w-40 pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>  */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2  w-full sm:w-auto"
        >
          <ArrowUpDown className="w-4 h-3 text-gray-600  text-[12px]" />
         <span className="text-gray-600 text-[12px]">Sort</span>

        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-10">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  sortBy === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''
                } ${option.value === sortOptions[0].value ? 'rounded-t-lg' : ''} ${
                  option.value === sortOptions[sortOptions.length - 1].value ? 'rounded-b-lg' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

     
    </div>
       
    </>
  );
};
