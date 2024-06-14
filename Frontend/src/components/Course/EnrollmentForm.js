import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './enrollmentForm.css';

const EnrollmentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId;
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [enrollmentKey, setEnrollmentKey] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCourses(response.data);
            } catch (error) {
                setMessage('Error fetching courses: ' + (error.response ? error.response.data : error.message));
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/enrollments', 
                { userId, courseId: selectedCourseId, enrollmentKey },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage('Enrollment successful!');
            navigate(-1); 
        } catch (error) {
            setMessage('Error enrolling: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="bodyWrap1">
            <div className="contentEnrollWrap1">
                <div className="enrollSide1">
                    <div className="enrollWrap1">
                        <form onSubmit={handleSubmit}>
                            <h2>Enroll in a Course</h2>
                            {message && <p>{message}</p>}
                            <div className="input-group1">
                                <select 
                                    id="course" 
                                    value={selectedCourseId} 
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a course</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                                <label className={`${selectedCourseId.length > 0 ? "focusLabel" : ""}`}></label>
                            </div>
                            <div className="input-group1">
                                <input
                                    type="text"
                                    id="enrollmentKey"
                                    value={enrollmentKey}
                                    onChange={(e) => setEnrollmentKey(e.target.value)}
                                    required
                                />
                                <label className={`${enrollmentKey.length > 0 ? "focusLabel" : ""}`}>Enrollment Key</label>
                            </div>
                            <button type="submit" disabled={!selectedCourseId || !enrollmentKey}>Enroll</button>
                        </form>
                    </div>
                </div>
                <div className="kl">
                    <div className="enrollWrap">
                        <h2>Welcome!</h2>
                        <p style={{ color: 'white' }}>Enroll in your desired course using the provided key.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentForm;
