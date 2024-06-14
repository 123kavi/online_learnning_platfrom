import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error.response ? error.response.data : error.message);
            }
        };
        fetchCourses();
    }, []);

    const handleBack = () => {
        navigate(-2); 
    };

    return (
        <div className="loginContainer">
            <div className="loginWrap">
                <h2>Welcome to Course List</h2>
                {message && <p>{message}</p>}
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>{course.title}</li>
                    ))}
                </ul>
                <button className="backButton" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
};

export default CourseList;
