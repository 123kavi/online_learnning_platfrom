import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get('/enrollments');
        setEnrollments(response.data);
      } catch (error) {
        console.error('Error fetching enrollments', error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h2>Enrollments</h2>
      <ul>
        {enrollments.map(enrollment => (
          <li key={enrollment.id}>
            <p>User ID: {enrollment.userId}</p>
            <p>Course ID: {enrollment.courseId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrollmentList;
