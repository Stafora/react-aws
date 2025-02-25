import React from 'react';

const LoadingSpinner = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin border-t-4 border-blue-500 border-8 w-16 h-16 rounded-full"></div>
    </div>
);

export default LoadingSpinner;