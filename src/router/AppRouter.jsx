import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Route */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more routes here, e.g., Profile, Settings */}
          <Route path="*" element={
            <main className="p-4 text-center">
              <h1 className="text-3xl font-bold text-gray-700">404 - Page Not Found</h1>
              <p className="text-gray-500 mt-2">The requested URL was not found on this server.</p>
            </main>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;