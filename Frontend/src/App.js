import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import CourseList from './components/Course/CourseList';
import Home from './components/Home';
import StudentManagement from './components/Admin/UseManagement/StudentManagement';
import EnrollmentManagement from './components/Admin/EnrollmentManagement/EnrollmentManagement';
import CourseManagement from './components/Admin/CourseManagement/CourseManagement';
import AddStudent from './components/Admin/UseManagement/AddStudent';
import AddCourse from './components/Admin/CourseManagement/AddCourse';
import AddEnrollment from './components/Admin/EnrollmentManagement/AddEnrollment';
import EnrollmentDetail from './components/Course/CourseList';
import UserEnrollments from './components/Course/UserEnrollments';
import EnrollmentForm from './components/Course/EnrollmentForm';
const App = () => {
  return (
    <Router>
   
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<CourseList />} />
       <Route path="/enrollments" element={<EnrollmentDetail />} />
        <Route path="/userenrollments" element={<UserEnrollments />} /> 
        <Route path="/course-management" element={<CourseManagement/>} />
        <Route path="/student-management" element={<StudentManagement/>} />
        <Route path="/enrolement" element={<EnrollmentManagement/>} />
        <Route path="/add-student" element={<AddStudent/>} />
        <Route path="/add-student/:id" element={<AddStudent />} />
        <Route path="/enroll" element={<EnrollmentForm />} />
        <Route path="/add-course/:id?" element={<AddCourse />} />
        <Route exact path="/enrollment-management" element={<EnrollmentManagement/>} />
        <Route path="/add-enrollment/:id" element={<AddEnrollment />} />
        <Route path="/add-enrollment" element={<AddEnrollment />} />

                
      </Routes>
    
  </Router>
);
};

export default App;

