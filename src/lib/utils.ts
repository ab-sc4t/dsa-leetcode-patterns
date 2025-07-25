import { Problem, FilterState, CategoryStats } from './types';

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-100';
    case 'Medium':
      return 'text-amber-600 bg-amber-100';
    case 'Hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const filterProblems = (problems: Problem[], filters: FilterState): Problem[] => {
  return problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDifficulty = filters.difficulty === '' || problem.difficulty === filters.difficulty;
    const matchesCategory = filters.category === '' || problem.categories.includes(filters.category);
    const matchesCompleted = filters.completed === '' || 
      (filters.completed === 'completed' && problem.completed) ||
      (filters.completed === 'incomplete' && !problem.completed);
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesCompleted;
  });
};

export const getTotalStats = (problems: Problem[]): CategoryStats => {
  const totalProblems = problems.length;
  const completedProblems = problems.filter(p => p.completed).length;
  
  return {
    total: totalProblems,
    completed: completedProblems,
    percentage: totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0
  };
};

export const getCategoryStats = (problems: Problem[], category: string): CategoryStats => {
  const categoryProblems = problems.filter(p => p.categories.includes(category));
  const completedProblems = categoryProblems.filter(p => p.completed).length;
  
  return {
    total: categoryProblems.length,
    completed: completedProblems,
    percentage: categoryProblems.length > 0 ? Math.round((completedProblems / categoryProblems.length) * 100) : 0
  };
};

export const saveProgress = (problems: Problem[]): void => {
  const progressData = problems.map(p => ({
    id: p.id,
    completed: p.completed || false
  }));
  localStorage.setItem('leetcode-patterns-progress', JSON.stringify(progressData));
};

export const loadProgress = (): { id: number; completed: boolean }[] | null => {
  const saved = localStorage.getItem('leetcode-patterns-progress');
  return saved ? JSON.parse(saved) : null;
};