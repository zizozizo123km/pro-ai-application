import React from 'react';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <AppRouter />
    </div>
  );
}

export default App;