import React from 'react';
import { BarChart3, Filter } from 'lucide-react';
import { CategoryStats, Problem } from '../lib/types';
import { getStatsByDifficulty } from '../lib/utils';

interface ProgressStatsCardProps {
  icon?: React.ReactNode;
  title: string;
  stats: CategoryStats;
  progressColorClass: string;
  barColorClass: string;
}

interface StatsBarProps {
  totalStats: CategoryStats;
  categoryStats?: CategoryStats;
  categoryName?: string;
  problems: Problem[];
}

const ProgressStatsCard: React.FC<ProgressStatsCardProps> = ({ icon, title, stats, progressColorClass, barColorClass }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <div className="flex items-center space-x-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-600">Total</p>
        <p className="text-xl font-bold text-gray-900">{stats.total}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Completed</p>
        <p className="text-xl font-bold text-green-600">{stats.completed}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Progress</p>
        <div className="flex items-center space-x-2">
          <p className={`text-xl font-bold ${progressColorClass}`}>{stats.percentage}%</p>
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={`${barColorClass} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatsBar: React.FC<StatsBarProps> = ({ totalStats, categoryStats, categoryName, problems }) => {
  const statsByDifficulty = getStatsByDifficulty(problems);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-6 ${categoryStats && categoryName ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          <ProgressStatsCard
            icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
            title="Overall Progress"
            stats={totalStats}
            progressColorClass="text-indigo-600"
            barColorClass="bg-indigo-600"
          />

          {categoryStats && categoryName && (
            <ProgressStatsCard
              icon={<Filter className="h-6 w-6 text-purple-600" />}
              title={`${categoryName} Progress`}
              stats={categoryStats}
              progressColorClass="text-purple-600"
              barColorClass="bg-purple-600"
            />
          )}
        </div>

        {/* Difficulty Progress Bars */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {statsByDifficulty.map(({ level, total, completed, percent }) => (
            <div key={level} className="p-4 bg-white rounded shadow">
              <div className="font-semibold mb-2">{level} Progress</div>
              <div className="flex items-center justify-between mb-1">
                <span>Total: {total}</span>
                <span>Completed: {completed}</span>
                <span className={
                  level === 'Easy' ? 'text-green-600' :
                  level === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }>
                  {percent}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={
                    'h-2 rounded-full ' +
                    (level === 'Easy'
                      ? 'bg-green-500'
                      : level === 'Medium'
                      ? 'bg-yellow-500'
                      : 'bg-red-500')
                  }
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;