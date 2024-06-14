const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course'); 

const getUserEnrollments = async (req, res) => {
  try {
      const enrollments = await Enrollment.findAll({
          where: { userId: req.user.id },
          include: Course // Include Course model to fetch related data
      });
      res.json(enrollments);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const getEnrolledCoursesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.findAll({
      where: { userId },
      include: { model: Course, attributes: ['title'] }
    });

    const courseTitles = enrollments.map(enrollment => enrollment.Course.title);

    res.json(courseTitles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET all enrollments (admin access required)
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET enrollment by ID (authenticated user access)
const getEnrollmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET enrollments by user ID (admin access required)
const getEnrollmentsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const enrollments = await Enrollment.findAll({ where: { userId } });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new enrollment (authenticated user access)
const addEnrollment = async (req, res) => {
  const { userId, courseId, enrollmentKey } = req.body;

  try {
    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId }
    });

    if (existingEnrollment) {
      console.log('User is already enrolled in the course:', { userId, courseId });
      return res.status(400).json({ message: 'You cannot enroll in the same course again.' });
    }

    // Fetch the course to get the courseEnrollmentId
    const course = await Course.findByPk(courseId);

    if (!course) {
      console.log('Course not found:', { courseId });
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Validate the provided enrollment key
    if (course.courseenrolmentid !== enrollmentKey) {
      console.log('Invalid enrollment key:', { courseenrolmentid: course.courseenrolmentid, enrollmentKey });
      return res.status(400).json({ message: 'Invalid enrollment key.' });
    }

    // Create a new enrollment if the user is not already enrolled in the course and the key is valid
    const newEnrollment = await Enrollment.create({ userId, courseId });
    console.log('New enrollment created:', newEnrollment);
    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ message: error.message });
  }
};

// PUT update enrollment by ID (admin access required)
const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const { userId, courseId } = req.body;
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    enrollment.userId = userId || enrollment.userId;
    enrollment.courseId = courseId || enrollment.courseId;
    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addEnrollmentByAdmin = async (req, res) => {
  const { userId, courseId, enrollmentKey } = req.body;

  try {
    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({
      where: { userId, courseId }
    });

    if (existingEnrollment) {
      console.log('User is already enrolled in the course:', { userId, courseId });
      return res.status(400).json({ message: 'User is already enrolled in the course.' });
    }

    // Fetch the course to get the courseEnrollmentId
    const course = await Course.findByPk(courseId);

    if (!course) {
      console.log('Course not found:', { courseId });
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Validate the provided enrollment key
    if (course.courseenrolmentid !== enrollmentKey) {
      console.log('Invalid enrollment key:', { courseenrolmentid: course.courseenrolmentid, enrollmentKey });
      return res.status(400).json({ message: 'Invalid enrollment key.' });
    }

    // Create a new enrollment if the user is not already enrolled in the course and the key is valid
    const newEnrollment = await Enrollment.create({ userId, courseId });
    console.log('New enrollment created:', newEnrollment);
    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ message: error.message });
  }
};
// DELETE enrollment by ID (admin access required)
const deleteEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    await enrollment.destroy();
    res.json({ message: 'Enrollment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserEnrollments,
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentsByUserId,
  addEnrollment,
  updateEnrollment,
  deleteEnrollment,
  addEnrollmentByAdmin,
  getEnrolledCoursesByUserId
};
