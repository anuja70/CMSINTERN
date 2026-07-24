import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import Layout from '../Components/layout/Layout';
import AuthLayout from '../Components/layout/AuthLayout';
import AdminLayout from '../Components/layout/AdminLayout';
import StaffLayout from '../Components/layout/StaffLayout';
import PatientLayout from '../Components/layout/PatientLayout';

// Public pages
import Home from '../pages/Home';
import Doctor from '../pages/Doctor';
import DoctorDetail from '../pages/DoctorDetail';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/Error';
import Services from '../pages/Services';
import ServiceDetail from '../pages/ServiceDetail';
import Booking from '../pages/Booking';

// Dashboard pages
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import AdminDoctors from "../pages/Dashboard/Admin/AdminDoctors";
import AdminReports from "../pages/Dashboard/Admin/AdminReports";
import AdminSettings from "../pages/Dashboard/Admin/AdminSettings";

import StaffOverview from "../pages/Dashboard/Staff/StaffOverview";
import StaffAppointment from "../pages/Dashboard/Staff/StaffAppointment";
import Staffpatients from "../pages/Dashboard/Staff/Staffpatients";
import StaffQueue from "../pages/Dashboard/Staff/StaffQueue";
import StaffBiling from "../pages/Dashboard/Staff/StaffBiling";
import StaffSetting from "../pages/Dashboard/Staff/StaffSetting";

import PatientAppointment from "../pages/Dashboard/patient/PatientAppointment";
import PatientHistory from "../pages/Dashboard/patient/PatientHistory";

import LoadingSpinner from "../Components/ui/LoadingSpinner";

const RouteWrapper = ({ children }) => (
  <React.Suspense
    fallback={
      <div className="flex-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    }
  >
    {children}
  </React.Suspense>
);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  // ---- Public website ----
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <RouteWrapper><Home /></RouteWrapper> },
      { path: 'doctors', element: <RouteWrapper><Doctor /></RouteWrapper> },
      { path: 'doctors/:id', element: <RouteWrapper><DoctorDetail /></RouteWrapper> },
      { path: 'services', element: <RouteWrapper><Services /></RouteWrapper> },
      { path: 'services/:serviceId', element: <RouteWrapper><ServiceDetail /></RouteWrapper> },
      { path: 'about', element: <RouteWrapper><About /></RouteWrapper> },
      { path: 'contact', element: <RouteWrapper><Contact /></RouteWrapper> },
      { path: 'book', element: <RouteWrapper><Booking /></RouteWrapper> },
      { path: 'home', element: <Navigate to="/" replace /> },
    ],
  },

  // ---- Authenticated dashboards (Admin, Staff, Patient) ----
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
  { index: true, element: <AdminOverview /> },
  { path: "doctors", element: <AdminDoctors /> },
  { path: "reports", element: <AdminReports /> },
  { path: "settings", element: <AdminSettings /> },
],

    
  },
  {
    path: '/staff',
    element: (
      <ProtectedRoute>
        <StaffLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
   children: [
  { index: true, element: <StaffOverview /> },
  { path: "appointments", element: <StaffAppointment /> },
  { path: "patients", element: <Staffpatients /> },
  { path: "queue", element: <StaffQueue /> },
  { path: "billing", element: <StaffBiling /> },
  { path: "settings", element: <StaffSetting /> },
],
  },
  {
    path: '/patient',
    element: (
      <ProtectedRoute>
        <PatientLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
  { index: true, element: <PatientAppointment /> },
  { path: "history", element: <PatientHistory /> },
],
  },

  // ---- Auth ----
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <RouteWrapper>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email or phone</label>
                <input type="text" placeholder="you@example.com" className="input" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input type="password" placeholder="••••••••" className="input" />
              </div>
              <button
                onClick={() => {
                  localStorage.setItem('auth_token', 'demo_token');
                  window.location.href = '/dashboard';
                }}
                className="btn btn-primary btn-full"
              >
                Sign in
              </button>
              <p className="text-center text-xs text-slate-400">Demo mode — any credentials will sign you in.</p>
            </div>
          </RouteWrapper>
        ),
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;