import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout/AppLayout';
import ProtectedRoute, { PublicOnlyRoute } from './components/common/ProtectedRoute/ProtectedRoute';
import Loader from './components/common/Loader/Loader';

// Code-split pages for performance optimization
const Home = lazy(() => import('./pages/Home/Home'));
const Explore = lazy(() => import('./pages/Explore/Explore'));
const Reels = lazy(() => import('./pages/Reels/Reels'));
const Messages = lazy(() => import('./pages/Messages/Messages'));
const Notifications = lazy(() => import('./pages/Notifications/Notifications'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Saved = lazy(() => import('./pages/Saved/Saved'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader size="lg" text="Loading VYBE..." />
        </div>
      }
    >
      <Routes>
        {/* Public-only authentication routes */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        {/* Authenticated Application routes inside persistent AppLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="reels" element={<Reels />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="create" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="saved" element={<Saved />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
