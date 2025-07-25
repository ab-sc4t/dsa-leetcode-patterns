export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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

export type RawQuestion = {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url?: string;
  slug?: string;
  premium?: boolean;
  pattern?: string[];
};