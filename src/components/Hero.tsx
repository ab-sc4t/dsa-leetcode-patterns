import React from 'react';
import { Zap, Target, BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master LeetCode with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Proven Patterns
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Learn the most effective algorithmic patterns to solve 95% of coding interview problems. 
            Track your progress and build confidence systematically.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pattern-Based Learning</h3>
              <p className="text-blue-200 text-center">
                Organize problems by underlying patterns rather than random practice
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-blue-200 text-center">
                Monitor your completion rate and identify areas that need more practice
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Collection</h3>
              <p className="text-blue-200 text-center">
                Hand-picked problems that cover the most important coding patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;