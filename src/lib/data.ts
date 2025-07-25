import { Problem, RawQuestion } from './types';

// This will be populated from the GitHub data
export let problems: Problem[] = [];

// Function to load and process the GitHub data
export const loadProblemsData = async (): Promise<Problem[]> => {
  try {
    const response = await fetch('/questions.json');
    const data = await response.json();

    // Your file has a "data" array of questions
    const processedProblems: Problem[] = data.data.map((question: RawQuestion) => ({
      id: question.id + 1,
      title: question.title,
      difficulty: question.difficulty as 'Easy' | 'Medium' | 'Hard',
      leetcodeUrl: question.url || `https://leetcode.com/problems/${question.slug}/`,
      premium: question.premium || false,
      completed: false,
      categories: question.pattern || []
    }));

    processedProblems.sort((a, b) => a.id - b.id);

    problems = processedProblems;
    return processedProblems;
  } catch (error) {
    console.error('Failed to load problems data:', error);
    return [];  
  } finally {
    console.log('Problems loaded:', problems.length);
  }
};

// Get all unique categories
export const getAllCategories = (problems: Problem[]): string[] => {
  const categories = new Set<string>();
  problems.forEach(problem => {
    problem.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
};