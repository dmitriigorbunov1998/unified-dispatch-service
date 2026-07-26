import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/app/layout/AppLayout';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Settings } from '@/pages/Settings/Settings';
import { Database } from '@/pages/Database/Database';

import './App.css';

export function App() {
  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <AppLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/database" element={<Database />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}
