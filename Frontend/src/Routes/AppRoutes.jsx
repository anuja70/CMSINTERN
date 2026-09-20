import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from '../hooks/authHooks.js';

// Layouts
import Layout from "../Components/layout/Layout";
import AuthLayout from "../Components/layout/AuthLayout";
import AdminLayout from "../Components/layout/AdminLayout";
import StaffLayout from "../Components/layout/StaffLayout";
import PatientLayout from "../Components/layout/PatientLayout";
import DoctorLayout from "../Components/layout/DoctorLayout";

// Public pages
import Home from "../pages/Home";
import Doctor from "../pages/Doctor";
import DoctorDetail from "../pages/DoctorDetail";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/Error";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Booking from "../pages/Booking";
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import VerifyEmail from '../pages/VerifyEmail.jsx';

// Admin Dashboard
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import AdminDoctors from "../pages/Dashboard/Admin/AdminDoctors";
import AdminReports from "../pages/Dashboard/Admin/AdminReports";
import AdminSettings from "../pages/Dashboard/Admin/AdminSettings";

// Staff Dashboard
import StaffOverview from "../pages/Dashboard/Staff/StaffOverview";
import StaffAppointments from "../pages/Dashboard/Staff/StaffAppointment";
import StaffPatients from "../pages/Dashboard/Staff/StaffPatients.jsx";
import StaffQueue from "../pages/Dashboard/Staff/StaffQueue";
import StaffBilling from "../pages/Dashboard/Staff/StaffBilling";
import StaffSettings from "../pages/Dashboard/Staff/StaffSetting";

// Patient Dashboard
import PatientAppointment from "../pages/Dashboard/patient/PatientAppointment";
import PatientHistory from "../pages/Dashboard/patient/PatientHistory";

// Doctor Dashboard
import DoctorOverview from "../pages/Dashboard/doctor/DoctorOverview";
import DoctorAppointments from "../pages/Dashboard/doctor/DoctorAppointments";
import DoctorPatients from "../pages/Dashboard/doctor/DoctorPatients";
import DoctorRecords from "../pages/Dashboard/doctor/DoctorRecords";
import DoctorSettings from "../pages/Dashboard/doctor/DoctorSettings";

import LoadingSpinner from "../Components/ui/LoadingSpinner" ;

const ROLE_DASHBOARD_MAP = {
  ADMIN: '/admin',
  DOCTOR: '/doctor',
  RECEPTIONIST: '/staff',
  PATIENT: '/patient',
};

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

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex-center min-h-[100vh]">
        <LoadingSpinner size="lg" text="Verifying authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (requiredRole) {
    const userRole = user?.role?.toUpperCase();
    const targetRole = requiredRole.toUpperCase();
    const allowedRoles = targetRole === 'STAFF' ? ['RECEPTIONIST', 'DOCTOR'] : [targetRole];
    if (userRole && !allowedRoles.includes(userRole)) {
      const redirect = ROLE_DASHBOARD_MAP[userRole] || '/login';
      return <Navigate to={redirect} replace />;
    }
  }

  return children;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAppSelector((s) => s.auth);

  if (isLoading) {
    return (
      <div className="flex-center min-h-[100vh]">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (isAuthenticated && user?.role) {
    const redirect = ROLE_DASHBOARD_MAP[user.role.toUpperCase()] || '/';
    return <Navigate to={redirect} replace />;
  }

  return children;
};

const redirectByRole = () => {
  const role = localStorage.getItem('auth_role');
  return ROLE_DASHBOARD_MAP[role?.toUpperCase()] || '/login';
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <RouteWrapper><Home /></RouteWrapper> },
      { path: 'doctors', element: <RouteWrapper><Doctor /></RouteWrapper> },
      { path: 'doctors/:id', element: <RouteWrapper><DoctorDetail /></RouteWrapper> },
       { path: 'departments', element: <RouteWrapper><Departments /></RouteWrapper> },
      { path: 'departments/:id', element: <RouteWrapper><DepartmentDetail /></RouteWrapper> },
      { path: 'services', element: <RouteWrapper><Services /></RouteWrapper> },
      { path: 'services/:serviceId', element: <RouteWrapper><ServiceDetail /></RouteWrapper> },
      { path: 'about', element: <RouteWrapper><About /></RouteWrapper> },
      { path: 'contact', element: <RouteWrapper><Contact /></RouteWrapper> },
      { path: 'book', element: <RouteWrapper><Booking /></RouteWrapper> },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'dashboard', element: <Navigate to={redirectByRole()} replace /> },
    ],
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'doctors', element: <AdminDoctors /> },
      { path: 'departments', element: <AdminDepartments /> },
      { path: 'staff', element: <AdminStaff /> },
      { path: 'reports', element: <AdminReports /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },

  {
    path: '/staff',
    element: (
      <ProtectedRoute requiredRole="STAFF">
        <StaffLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <StaffOverview /> },
      { path: 'appointments', element: <StaffAppointments /> },
      { path: 'patients', element: <StaffPatients /> },
      { path: 'queue', element: <StaffQueue /> },
      { path: 'billing', element: <StaffBilling /> },
      { path: 'settings', element: <StaffSettings /> },
    ],
  },

  {
    path: '/doctor',
    element: (
      <ProtectedRoute requiredRole="DOCTOR">
        <DoctorLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { path: 'onboarding', element: <DoctorOnboarding /> },
      { index: true, element: <DoctorOverview /> },
      { path: 'appointments', element: <DoctorAppointments /> },
      { path: 'patients', element: <DoctorPatients /> },
      { path: 'records', element: <DoctorRecords /> },
      { path: 'settings', element: <DoctorSettings /> },
    ],
  },

  {
    path: '/patient',
    element: (
      <ProtectedRoute requiredRole="PATIENT">
        <PatientLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <PatientAppointments /> },
      { path: 'history', element: <PatientHistory /> },
    ],
  },

  {
    path: '/login',
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RouteWrapper>
            <Login />
          </RouteWrapper>
        ),
      },
    ],
  },

  {
    path: '/register',
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RouteWrapper>
            <Register />
          </RouteWrapper>
        ),
      },
    ],
  },
  {
    path: '/forgot-password',
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RouteWrapper>
            <ForgotPassword />
          </RouteWrapper>
        ),
      },
    ],
  },

  {
    path: '/reset-password',
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RouteWrapper>
            <ResetPassword />
          </RouteWrapper>
        ),
      },
    ],
  },


  { path: '*', element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;