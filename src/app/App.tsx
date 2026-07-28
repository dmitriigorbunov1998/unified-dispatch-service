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
    <Routes>
      {/* Обособленная публичная страница */}
      <Route path="/" element={<Landing />} />

      {/* Страницы основного приложения с Header */}
      <Route element={<AppLayout onLogout={handleLogout} />}>
        <Route path="/home" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/database" element={<Database />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
