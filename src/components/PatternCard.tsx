import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { Pattern, Problem } from '../lib/types';
import { getDifficultyColor, getProgressPercentage } from '../lib/utils';

interface PatternCardProps {
  pattern: Pattern;
  onToggleComplete: (patternId: string, problemId: number) => void;
}

const PatternCard: React.FC<PatternCardProps> = ({ pattern, onToggleComplete }) => {
  const progressPercentage = getProgressPercentage(pattern);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${pattern.color} rounded-lg flex items-center justify-center text-white text-xl font-medium`}>
              {pattern.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{pattern.name}</h3>
              <p className="text-gray-600 mt-1">{pattern.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">{progressPercentage}%</span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${pattern.color}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {pattern.problems.map((problem) => (
            <ProblemItem
              key={problem.id}
              problem={problem}
              onToggleComplete={() => onToggleComplete(pattern.id, problem.id)}
            />
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{pattern.problems.length} problems</span>
            <span>{pattern.problems.filter(p => p.completed).length} completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProblemItemProps {
  problem: Problem;
  onToggleComplete: () => void;
}

const ProblemItem: React.FC<ProblemItemProps> = ({ problem, onToggleComplete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleComplete}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            problem.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {problem.completed && <CheckCircle className="h-3 w-3" />}
        </button>
        
        <div>
          <h4 className={`font-medium ${problem.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {problem.title}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            {problem.premium && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Premium
              </span>
            )}
          </div>
        </div>
      </div>
      
      <a
        href={problem.leetcodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 transition-colors"
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
};

export default PatternCard;