import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './courses.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourses();
  }, []);

  // Function to fetch courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Function to handle course deletion
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="course-management">
      <h1>Course Management</h1>
      <Link to="/add-course">
        <button className='button1'>Add Course</button>
      </Link>
      <Link to="/home">
        <button className='button2'>Go Back</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Course Enrollment ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>
                <div className="description-shadow-box">{course.description}</div>
              </td>
              <td>{course.courseenrolmentid}</td>
              <td className="action-buttons">
                <Link to={`/add-course/${course.id}`}>
                  <button>Update</button>
                </Link>
                <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
