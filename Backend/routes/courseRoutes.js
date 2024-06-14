const express = require('express');
const { getAllCourses, addCourse, deleteCourse,getCourseById,updateCourseById } = require('../controllers/courseController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllCourses);
router.post('/', authMiddleware, adminMiddleware, addCourse);
// router.put('/:id', authMiddleware, adminMiddleware, updateCourse);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCourse);
// Update a course by ID
router.put('/courses/:id',authMiddleware, adminMiddleware, updateCourseById);

router.get('/:id', authMiddleware, adminMiddleware,getCourseById);
router.put('courses/:id', authMiddleware, adminMiddleware, updateCourseById);

module.exports = router;
