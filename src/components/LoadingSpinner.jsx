import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 
      flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 
          rounded-full animate-spin"></div>
        
        {/* Inner ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 
          rounded-full animate-spin-reverse"></div>
        
        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
          text-white font-medium tracking-wider animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 