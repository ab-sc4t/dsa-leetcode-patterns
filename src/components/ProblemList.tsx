import React from 'react';
import { CheckCircle, Tag } from 'lucide-react';
import { Problem } from '../lib/types';
import { getDifficultyColor } from '../lib/utils';

interface ProblemListProps {
  problems: Problem[];
  onToggleComplete: (problemId: number) => void;
}

interface ProblemItemProps {
  problem: Problem;
  onToggleComplete: () => void;
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, onToggleComplete }) => {
  if (problems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No problems found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {problems.map((problem) => (
        <ProblemItem
          key={problem.id}
          problem={problem}
          onToggleComplete={() => onToggleComplete(problem.id)}
        />
      ))}
    </div>
  );
};

const ProblemItem: React.FC<ProblemItemProps> = ({ problem, onToggleComplete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <a
        href={problem.leetcodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 transition-colors ml-4 w-full"
      >
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onToggleComplete}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${problem.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
              }`}
          >
            {problem.completed && <CheckCircle className="h-4 w-4" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm font-medium text-gray-500">#{problem.id}</span>
              <h3 className={`font-medium text-lg ${problem.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {problem.title}
              </h3>
            </div>

            <div className="flex items-center space-x-2 flex-wrap">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>

              {problem.premium && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Premium
                </span>
              )}

              <div className="flex items-center space-x-1">
                <Tag className="h-3 w-3 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {problem.categories.map((category, index) => (
                    <span key={category} className="text-xs text-gray-600">
                      {category}{index < problem.categories.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProblemList;