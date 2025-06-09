import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import Navbar from '~/components/Shared/Navbar';
import LoginPage from '~/pages/LoginPage';
import SignupPage from '~/pages/SignupPage';
import DashboardPage from '~/pages/DashboardPage';
import NotFoundPage from '~/pages/NotFoundPage';
import { AuthProvider } from '~/contexts/AuthContext';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-900">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
              <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} />
              <Route 
                path="/dashboard/*" 
                element={user ? <DashboardPage /> : <Navigate to="/login" />} 
              />
              <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-gray-300 text-center p-4">
            © {new Date().getFullYear()} منصة التدريب الرياضي. جميع الحقوق محفوظة.
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;