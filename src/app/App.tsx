import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/app/layout/AppLayout';
import { HomeContainer } from '@/pages/Home/HomeContainer';
import { DashboardContainer } from '@/pages/Dashboard/DashboardContainer';
import { SettingsContainer } from '@/pages/Settings/SettingsContainer';
import { DatabaseContainer } from '@/pages/Database/DatabaseContainer';

import './App.css';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeContainer />} />

        <Route path="/dashboard" element={<DashboardContainer />} />

        <Route path="/database" element={<DatabaseContainer />} />

        <Route path="/settings" element={<SettingsContainer />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
