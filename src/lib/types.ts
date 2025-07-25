export interface Problem {
  id: number;
  title: string;
  difficulty: DifficultyLevel;
  leetcodeUrl: string;
  completed?: boolean;
  premium?: boolean;
  categories: string[];
}

export interface FilterState {
  search: string;
  difficulty: string;
  category: string;
  completed: string;
}

export interface CategoryStats {
  total: number;
  completed: number;
  percentage: number;
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode | string;
  problems: Problem[];
}

export type RawQuestion = {
  id: number;
  title: string;
  difficulty: DifficultyLevel;
  url?: string;
  slug?: string;
  premium?: boolean;
  pattern?: string[];
};

export enum CompletionStatus {
  All = '',
  Completed = 'completed',
  Incomplete = 'incomplete',
}

export enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}