import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/app/layout/AppLayout';
import { Home } from '@/pages/Home/Home';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Settings } from '@/pages/Settings/Settings';
import { Database } from '@/pages/Database/Database';

import './App.css';
import { Landing } from '@pages/Landing/Landing.tsx';

export function App() {
  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <AppLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/" replace />} />

        <Route path="/landing" element={<Landing />} />

        <Route path="/home" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/database" element={<Database />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
