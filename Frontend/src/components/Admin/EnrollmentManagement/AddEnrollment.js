import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './enrollments.css';

const AddEnrollment = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [enrollmentKey, setEnrollmentKey] = useState('');
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(); // Fetch courses for dropdown menu
    if (id) {
      fetchEnrollmentDetails(); // Fetch enrollment details if id exists (for update)
    }
  }, [id]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchEnrollmentDetails = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:5000/api/enrollments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { userId, courseId, enrollmentKey } = response.data;
        setUserId(userId || ''); // Initialize with empty string if userId is undefined
        setCourseId(courseId || ''); // Initialize with empty string if courseId is undefined
        setEnrollmentKey(enrollmentKey || ''); // Initialize with empty string if enrollmentKey is undefined
      }
    } catch (error) {
      console.error('Error fetching enrollment details:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const enrollmentData = { userId, courseId, enrollmentKey };
      if (id) {
        // Update existing enrollment
        await axios.put(`http://localhost:5000/api/enrollments/${id}`, enrollmentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new enrollment by admin
        await axios.post('http://localhost:5000/api/enrollments/admin/enrollments', enrollmentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/enrollment-management'); // Navigate back to enrollment management page after submission
    } catch (error) {
      console.error('Error saving enrollment details:', error);
    }
  };

  return (
    <div className="bodyWrap">
      <div className="contentAddStudentWrap">
        <div className="formSide">
          <div className="formWrap formBorder">
            <form onSubmit={handleFormSubmit}>
              <h1>{id ? 'Update Enrollment' : 'Add Enrollment'}</h1>
              <div className="input-group">
                <input
                  type="text"
                  value={userId}
                  className="input"
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="User ID"
                  required
                />
                <label className={`${userId.length > 0 ? 'focusLabel' : ''}`}></label>
              </div>
              <div className="input-group">
                <select
                  value={courseId}
                  className="input"
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value=""></option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <label className={`${courseId.length > 0 ? 'focusLabel' : ''}`}>Select Course</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={enrollmentKey}
                  className="input"
                  onChange={(e) => setEnrollmentKey(e.target.value)}
                  placeholder="Enrollment Key"
                  required
                />
                <label className={`${enrollmentKey.length > 0 ? 'focusLabel' : ''}`}></label>
              </div>
              <button type="submit">{id ? 'Update Enrollment' : 'Add Enrollment'}</button>
            </form>
          </div>
        </div>
        <div className="infoSide1">
          <div className="formWrap">
            <h2>{id ? 'Edit Enrollment Details' : 'Add Enrollment Details'}</h2>
            <p>{id ? 'Update the details of the enrollment.' : 'Fill out the form to add a new enrollment.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEnrollment;
