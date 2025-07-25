import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import ProblemList from './components/ProblemList';
import Footer from './components/Footer';
import { loadProblemsData, getAllCategories } from './lib/data';
import { Problem, FilterState } from './lib/types';
import { filterProblems, getTotalStats, getCategoryStats, saveProgress, loadProgress } from './lib/utils';

function App() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    difficulty: '',
    category: '',
    completed: ''
  });

  // Load problems data and progress on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        const loadedProblems = await loadProblemsData();
        
        // Load saved progress
        const savedProgress = loadProgress();
        if (savedProgress) {
          const mergedProblems = loadedProblems.map(problem => {
            const savedProblem = savedProgress.find(p => p.id === problem.id);
            return savedProblem ? { ...problem, completed: savedProblem.completed } : problem;
          });
          setProblems(mergedProblems);
        } else {
          setProblems(loadedProblems);
        }
      } catch (error) {
        console.error('Failed to initialize data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const filteredProblems = useMemo(() => {
    return filterProblems(problems, filters);
  }, [problems, filters]);

  const totalStats = getTotalStats(problems);
  const categoryStats = filters.category ? getCategoryStats(problems, filters.category) : undefined;
  const categories = getAllCategories(problems);

  const handleToggleComplete = (problemId: number) => {
    const updatedProblems = problems.map(problem => {
      if (problem.id === problemId) {
        return { ...problem, completed: !problem.completed };
      }
      return problem;
    });
    
    setProblems(updatedProblems);
    saveProgress(updatedProblems);
  };

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main App Content */}
      <Header searchTerm={filters.search} onSearchChange={handleSearchChange} />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl pt-4 pb-2 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded text-center">
            <span className="font-semibold">Note:</span> This app uses your browser's cache (localStorage) to keep track of completed questions. Clearing your cache or localStorage will reset your progress.
          </div>
        </div>
        <StatsBar 
          totalStats={totalStats}
          categoryStats={categoryStats}
          categoryName={filters.category}
          problems={problems}
        />
        <FilterBar 
          filters={filters}
          onFilterChange={setFilters}
          categories={categories}
        />
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filters.category ? `${filters.category} Problems` : 'All Problems'}
          </h2>
          <p className="text-gray-600">
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <ProblemList
          problems={filteredProblems}
          onToggleComplete={handleToggleComplete}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;