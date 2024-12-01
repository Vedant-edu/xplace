import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import toast from 'react-hot-toast';

interface AdminPanelProps {
  onDataAdded: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onDataAdded }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    package: '',
    entc_students: '',
    scoe_students: '',
    total_students: '',
  });

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '42626') {
      setIsAuthenticated(true);
    } else {
      toast.error('Invalid PIN');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('placements').insert([{
        ...formData,
        package: Number(formData.package),
        entc_students: Number(formData.entc_students),
        scoe_students: Number(formData.scoe_students),
        total_students: Number(formData.total_students),
      }]);

      if (error) throw error;

      toast.success('Data added successfully');
      onDataAdded(); // Refresh the data after successful addition
      setFormData({
        company_name: '',
        package: '',
        entc_students: '',
        scoe_students: '',
        total_students: '',
      });
    } catch (error) {
      console.error('Error adding data:', error);
      toast.error('Error adding data');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          placeholder="Company Name"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="number"
          value={formData.package}
          onChange={(e) => setFormData({ ...formData, package: e.target.value })}
          placeholder="Package (LPA)"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="number"
          value={formData.entc_students}
          onChange={(e) => setFormData({ ...formData, entc_students: e.target.value })}
          placeholder="ENTC Students"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="number"
          value={formData.scoe_students}
          onChange={(e) => setFormData({ ...formData, scoe_students: e.target.value })}
          placeholder="SCoE Students"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="number"
          value={formData.total_students}
          onChange={(e) => setFormData({ ...formData, total_students: e.target.value })}
          placeholder="Total Students"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Data
        </button>
      </form>
    </div>
  );
};