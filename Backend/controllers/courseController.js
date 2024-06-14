const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCourse = async (req, res) => {
    const { title, description,courseenrolmentid } = req.body;

    try {
        const newCourse = await Course.create({ title, description,courseenrolmentid });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const course = await Course.getCourseById(id);
      if (!course) {
        return res.status(404).send({ error: 'Course not found' });
      }
      res.status(200).send(course);
    } catch (err) {
      console.error('Error fetching course:', err);
      res.status(500).send({ error: 'Error fetching course' });
    }
  };
  

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.title = title;
        course.description = description;
        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await course.destroy();
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateCourseById = async (req, res) => {
    const { id } = req.params;
    const { title, description, courseenrolmentid } = req.body; 

    try {
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.title = title;
        course.description = description;
        course.courseenrolmentid = courseenrolmentid; 
        await course.save();

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
















module.exports = { getAllCourses, addCourse, updateCourse, deleteCourse,getCourseById,updateCourseById };
