import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import InchargeDashboard from './pages/InchargeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SecurityDashboard from './pages/SecurityDashboard';
import './index.css';
import './styles/components.css';

const RoleRouter = () => {
  const { currentUser } = useAppContext();

  // Render the appropriate dashboard based on the current user's role
  switch (currentUser?.role) {
    case 'student':
      return <StudentDashboard />;
    case 'incharge':
      return <InchargeDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'security':
      return <SecurityDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

const AppContent = () => {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RoleRouter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

