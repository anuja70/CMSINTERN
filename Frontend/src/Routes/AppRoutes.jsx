import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layouts
import Layout from "../Components/layout/Layout";
import AuthLayout from "../Components/layout/AuthLayout";
import AdminLayout from "../Components/layout/AdminLayout";
import StaffLayout from "../Components/layout/StaffLayout";
import PatientLayout from "../Components/layout/PatientLayout";

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

// Admin dashboard
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import AdminDoctors from "../pages/Dashboard/Admin/AdminDoctors";
import AdminReports from "../pages/Dashboard/Admin/AdminReports";
import AdminSettings from "../pages/Dashboard/Admin/AdminSettings";

// Staff dashboard
import StaffOverview from "../pages/Dashboard/Staff/StaffOverview";
import StaffAppointment from "../pages/Dashboard/Staff/StaffAppointment";
import Staffpatients from "../pages/Dashboard/Staff/Staffpatients";
import StaffQueue from "../pages/Dashboard/Staff/StaffQueue";
import StaffBiling from "../pages/Dashboard/Staff/StaffBiling";
import StaffSetting from "../pages/Dashboard/Staff/StaffSetting";

// Patient dashboard
import PatientAppointment from "../pages/Dashboard/patient/PatientAppointment";
import PatientHistory from "../pages/Dashboard/patient/PatientHistory";

// UI
import LoadingSpinner from "../Components/ui/LoadingSpinner";

// Loading wrapper
const RouteWrapper = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

// Protected route
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Router
const router = createBrowserRouter([
  // =========================
  // PUBLIC WEBSITE
  // =========================
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <RouteWrapper>
            <Home />
          </RouteWrapper>
        ),
      },
      {
        path: "doctors",
        element: (
          <RouteWrapper>
            <Doctor />
          </RouteWrapper>
        ),
      },
      {
        path: "doctors/:id",
        element: (
          <RouteWrapper>
            <DoctorDetail />
          </RouteWrapper>
        ),
      },
      {
        path: "services",
        element: (
          <RouteWrapper>
            <Services />
          </RouteWrapper>
        ),
      },
      {
        path: "services/:serviceId",
        element: (
          <RouteWrapper>
            <ServiceDetail />
          </RouteWrapper>
        ),
      },
      {
        path: "about",
        element: (
          <RouteWrapper>
            <About />
          </RouteWrapper>
        ),
      },
      {
        path: "contact",
        element: (
          <RouteWrapper>
            <Contact />
          </RouteWrapper>
        ),
      },
      {
        path: "book",
        element: (
          <RouteWrapper>
            <Booking />
          </RouteWrapper>
        ),
      },
      {
        path: "home",
        element: <Navigate to="/" replace />,
      },
    ],
  },

  // =========================
  // ADMIN
  // =========================
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AdminOverview />,
      },
      {
        path: "doctors",
        element: <AdminDoctors />,
      },
      {
        path: "reports",
        element: <AdminReports />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },

  // =========================
  // STAFF
  // =========================
  {
    path: "/staff",
    element: (
      <ProtectedRoute>
        <StaffLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <StaffOverview />,
      },
      {
        path: "appointments",
        element: <StaffAppointment />,
      },
      {
        path: "patients",
        element: <Staffpatients />,
      },
      {
        path: "queue",
        element: <StaffQueue />,
      },
      {
        path: "billing",
        element: <StaffBiling />,
      },
      {
        path: "settings",
        element: <StaffSetting />,
      },
    ],
  },

  // =========================
  // PATIENT
  // =========================
  {
    path: "/patient",
    element: (
      <ProtectedRoute>
        <PatientLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <PatientAppointment />,
      },
      {
        path: "history",
        element: <PatientHistory />,
      },
    ],
  },

  // =========================
  // LOGIN
  // =========================
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="login-container">
            <h1>Login</h1>

            <input
              type="text"
              placeholder="Email or phone"
              className="input"
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
            />

            <button
              onClick={() => {
                localStorage.setItem("auth_token", "demo_token");
                window.location.href = "/admin";
              }}
              className="btn btn-primary btn-full"
            >
              Sign in
            </button>

            <p>Demo mode — any credentials will sign you in.</p>
          </div>
        ),
      },
    ],
  },

  // =========================
  // 404
  // =========================
  {
    path: "*",
    element: <NotFound />,
  },
]);

// App Router
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;