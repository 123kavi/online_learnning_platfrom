const express = require('express');
const router = express.Router();
const { 
  getUserEnrollments, 
  getAllEnrollments, 
  addEnrollment, 
  deleteEnrollment, 
  getEnrollmentById, 
  getEnrollmentsByUserId, 
  updateEnrollment ,
  addEnrollmentByAdmin,
  getEnrolledCoursesByUserId
} = require('../controllers/enrollmentController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// GET all enrollments for a specific user (admin access required)
router.get('/user', authMiddleware, adminMiddleware, getUserEnrollments);

// GET all enrollments (admin access required)
router.get('/', authMiddleware, adminMiddleware, getAllEnrollments);

// GET enrollment by ID (authenticated user access)
router.get('/:id', authMiddleware, getEnrollmentById);

// GET enrollments by user ID (admin access required)
router.get('/user/:userId', authMiddleware, adminMiddleware, getEnrollmentsByUserId);

// POST create a new enrollment (authenticated user access)
router.post('/', authMiddleware, addEnrollment);

// PUT update enrollment by ID (admin access required)
router.put('/:id', authMiddleware, adminMiddleware, updateEnrollment);

// DELETE enrollment by ID (admin access required)
router.delete('/:id', authMiddleware, adminMiddleware, deleteEnrollment);
router.get('/user/:userId/courses', getEnrolledCoursesByUserId);
router.post('/admin/enrollments',authMiddleware, adminMiddleware, addEnrollmentByAdmin);

module.exports = router;
