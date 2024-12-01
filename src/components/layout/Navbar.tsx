import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onThemeToggle,
}) => {
  const isAdmin = window.location.pathname === '/admin';

  return (
    <nav className="sticky top-0 bg-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white border border-white px-2">
            {isAdmin ? 'Xplace Admin' : 'Xplace'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {!isAdmin && (
            <Link
              to="/admin"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              A
            </Link>
          )}
          <ThemeToggle isDark={isDark} toggleTheme={onThemeToggle} />
        </div>
      </div>
    </nav>
  );
};
