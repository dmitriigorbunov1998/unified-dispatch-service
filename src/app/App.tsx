import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/app/layout/AppLayout';

import './App.css';

const HomePage = lazy(() =>
  import('@/pages/Home').then(({ HomeContainer }) => ({
    default: HomeContainer,
  }))
);
const DashboardPage = lazy(() =>
  import('@/pages/Dashboard').then(({ DashboardContainer }) => ({
    default: DashboardContainer,
  }))
);
const DatabasePage = lazy(() =>
  import('@/pages/Database').then(({ DatabaseContainer }) => ({
    default: DatabaseContainer,
  }))
);
const SettingsPage = lazy(() =>
  import('@/pages/Settings').then(({ SettingsContainer }) => ({
    default: SettingsContainer,
  }))
);

export function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/database" element={<DatabasePage />} />

          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
