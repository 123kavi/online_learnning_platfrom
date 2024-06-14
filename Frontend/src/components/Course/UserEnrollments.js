import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserEnrollments = () => {
    const { userId } = useParams();
    const [enrollments, setEnrollments] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/enrollments/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                setEnrollments(response.data);
            } catch (error) {
                setMessage('Error fetching enrollments: ' + (error.response ? error.response.data.message : error.message));
            }
        };
        fetchEnrollments();
    }, [userId]);

    return (
        <div>
            <h2>User Enrollments</h2>
            {message && <p>{message}</p>}
            {enrollments.length > 0 ? (
                <ul>
                    {enrollments.map(enrollment => (
                        <li key={enrollment.id}>
                            Course Title: {enrollment.Course.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No enrollments found for this user.</p>
            )}
        </div>
    );
};

export default UserEnrollments;
