import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './config/supabase';
import { PlacementData } from './types';
import { Navbar } from './components/layout/Navbar';
import { TabFilter } from './components/filters/TabFilter';
import { SearchSort } from './components/filters/SearchSort';
import { StatisticsPanel } from './components/stats/StatisticsPanel';
import { PlacementCard } from './components/PlacementCard';
import { AdminPanel } from './components/AdminPanel';
import { DisclaimerPopup } from './components/DisclaimerPopup'; // Assuming DisclaimerPopup is a component that handles the disclaimer popup

type SortOption = 'recent' | 'package' | 'students';

function App() {
  const [isDark, setIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [activeTab, setActiveTab] = useState<'entc' | 'scoe' | 'all'>('entc');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [data, setData] = useState<PlacementData[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false); // State to manage the disclaimer popup
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 7;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.style.backgroundColor = isDark ? '#111827' : '#f3f4f6';
  }, [isDark]);

  const fetchData = async () => {
    try {
      const { data: placementsData, error } = await supabase
        .from('placements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (placementsData) setData(placementsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data
    .filter(item => {
      const matchesSearch = item.company_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      if (activeTab === 'entc') return matchesSearch && item.entc_students > 0;
      if (activeTab === 'scoe') return matchesSearch && item.scoe_students > 0;
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'package':
          return b.package - a.package;
        case 'students':
          return b.total_students - a.total_students;
        default:
          return 0;
      }
    });

  const totalOffers = filteredData.reduce((acc, curr) => {
    if (activeTab === 'entc') return acc + curr.entc_students;
    if (activeTab === 'scoe') return acc + curr.scoe_students;
    return acc + curr.total_students;
  }, 0);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
        <Routes>
          <Route path="/admin" element={<AdminPanel onDataAdded={fetchData} />} />
          <Route path="/" element={
            <div>
              <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />
                    <SearchSort
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  </div>
                </div>

                <StatisticsPanel
                  data={data}
                  activeTab={activeTab}
                  totalOffers={totalOffers}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCards.map((item) => (
                    <PlacementCard key={item.id} data={item} section={activeTab} />
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  {Array.from({ length: Math.ceil(filteredData.length / cardsPerPage) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </main>

              <footer className="bg-gray-200 dark:bg-gray-800 flex justify-center gap-4 py-4 text-center">
                <p>&copy; Xplace 2024</p>
                <button onClick={() => setShowDisclaimer(true)} className="text-blue-500 hover:text-blue-700">
                  Disclaimer
                </button>
              </footer>

              {showDisclaimer && <DisclaimerPopup onDismiss={() => setShowDisclaimer(false)} />}
            </div>
          } />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;