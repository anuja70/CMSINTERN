import express from 'express';
import * as dashboardController from './dashboard.controller.js';
import { verifyToken, authorize } from '../../middleware/authMiddleware.js';
import { ROLES } from '../../constans/roles.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(verifyToken);

// ==================== DASHBOARD ROUTES ====================


// Doctor self dashboard (DOCTOR only)
router.get(
  '/doctor-me',
  authorize(ROLES.DOCTOR),
  dashboardController.getDoctorSelfDashboard
);

// Full statistics summary (Admin only)
router.get(
  '/statistics',
  authorize(ROLES.ADMIN),
  dashboardController.getDashboardStats
);

// Daily summary report (Admin + Receptionist)
router.get(
  '/daily-summary',
  authorize(ROLES.ADMIN, ROLES.RECEPTIONIST),
  dashboardController.getDailySummary
);

// Revenue report (Admin only)
router.get(
  '/revenue',
  authorize(ROLES.ADMIN),
  dashboardController.getRevenueReport
);

// Doctor-wise load (Admin + Receptionist)
router.get(
  '/doctor-load',
  authorize(ROLES.ADMIN, ROLES.RECEPTIONIST),
  dashboardController.getDoctorLoad
);

export default router;