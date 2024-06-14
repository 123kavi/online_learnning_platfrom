import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

import imageA from './A.jpg';
import imageB from './B.jpg';
import imageC from './C.jpg';
import logo from './logo.png';

const Home = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const location = useLocation();
    const responseData = location.state?.responseData;
    const userId = responseData?.userId;
    const token = responseData?.token;
    const role = responseData?.role;
    const navigate = useNavigate();

    // Slideshow state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [imageA, imageB, imageC];

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                if (userId && token) {
                    console.log('Fetching enrollments for userId:', userId);
                    const response = await axios.get(`http://localhost:5000/api/enrollments/user/${userId}/courses`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('Enrollments response:', response.data);
                    setEnrolledCourses(response.data);
                }
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };

        fetchEnrollments();
    }, [userId, token]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleAdminNavigation = (path) => {
        navigate(path);
    };

    const handleMouseEnter = () => {
        setIsPopupVisible(true);
    };

    const handleMouseLeave = () => {
        setIsPopupVisible(false);
    };

    const handleEnrollmentClick = () => {
        navigate('/enroll', { state: { userId } });
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    return (
        <div className="pageContainer">
            <div className="shadowBox">
                <div className="adminPanelHeader">
                    <div className="schoolLogoContainer">
                        <img src={logo} alt="School Logo" className="schoolLogo" />
                        <h1>California College</h1>
                    </div>
                    <div >
                        <button className="logoutButton" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="adminNav">
                    <ul className="adminNavList">
                        <li
                            className="adminNavItem"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button>My Enrollments</button>
                            {isPopupVisible && (
                                <div className="enrollmentsPopup">
                                    <ul>
                                        {enrolledCourses.length > 0 ? (
                                            enrolledCourses.map((courseTitle, index) => (
                                                <li key={index}>
                                                    <h3>{courseTitle}</h3>
                                                </li>
                                            ))
                                        ) : (
                                            <p>No enrollments found.</p>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="adminNavItem">
                            <button onClick={handleEnrollmentClick}>Enroll in Courses</button>
                        </li>
                        {role === 'student' ? (
                            <li className="adminNavItem">
                            </li>
                        ) : (
                            <>
                                <li className="adminNavItem">
                                    <button onClick={() => handleAdminNavigation('/course-management')}>Course Management</button>
                                </li>
                                <li className="adminNavItem">
                                    <button onClick={() => handleAdminNavigation('/student-management')}>Student Management</button>
                                </li>
                                <li className="adminNavItem">
                                    <button onClick={() => handleAdminNavigation('/enrollment-management')}>Enrollment Management</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="slideshow">
                    <img src={images[currentImageIndex]} alt="Slideshow" className="slideshow-image" />
                </div>
            </div>
        </div>
    );
};

export default Home;
