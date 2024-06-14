import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './enrollments.css';

const EnrollmentManagement = () => {
    const [enrollments, setEnrollments] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/enrollments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEnrollments(response.data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };

    const handleDeleteEnrollment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/enrollments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
        } catch (error) {
            console.error('Error deleting enrollment:', error);
        }
    };

    const handleUpdateEnrollment = (enrollment) => {
        navigate(`/add-enrollment/${enrollment.id}`);
    };

    return (
        <div className="enrollment-management">
            <h1>Enrollment Management</h1>
            <Link to="/add-enrollment">
                <button className='button1'>Add Enrollment</button>
            </Link>
            <Link to="/home">
          <button className='button2'>Go to Home Page</button>
        </Link>
            <table>
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>User ID</th>
                        <th>Course ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                            <td>{enrollment.id}</td>
                            <td>{enrollment.userId}</td>
                            <td>{enrollment.courseId}</td>
                            <td className="action-buttons">
                                <button onClick={() => handleUpdateEnrollment(enrollment)}>Update</button>
                                <button onClick={() => handleDeleteEnrollment(enrollment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrollmentManagement;
