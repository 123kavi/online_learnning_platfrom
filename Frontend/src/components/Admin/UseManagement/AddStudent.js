import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './userstyles.css';

const AddStudent = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchStudentDetails(); // Fetch student details if id exists
    }
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { username, role } = response.data;
      setUsername(username);
      setRole(role);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password, role };
      if (id) {
        // Update existing student
        await axios.put(`http://localhost:5000/api/users/${id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new student
        await axios.post('http://localhost:5000/api/users', userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/student-management'); 
    } catch (error) {
      console.error('Error saving student details:', error);
    }
  };

  return (
    <div className="bodyWrap">
      <div className="contentAddStudentWrap">
        <div className="formSide">
          <div className="formWrap formBorder">
            <form onSubmit={handleFormSubmit}>
              <h1>{id ? 'Update Student' : 'Add Student'}</h1>
              <div className="input-group">
                <input
                  type="text"
                  value={username}
                  className="input"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={id ? username : ''}
                  required
                />
                <label className={`${username.length > 0 ? 'focusLabel' : ''}`}>Username</label>
              </div>
              {!id && (
                <div className="input-group">
                  <input
                    type="password"
                    value={password}
                    className="input password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className={`${password.length > 0 ? 'focusLabel' : ''}`}>Password</label>
                </div>
              )}
              {id && (
                <div className="input-group">
                  <input
                    type="password"
                    value={password}
                    className="input password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled
                  />
                  <label className={`${password.length > 0 ? 'focusLabel' : ''}`}>Password (Disable)</label>
                </div>
              )}
              <div className="input-group">
                <select
                  value={role}
                  className="input"
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
                <label className="focusLabel">Role</label>
              </div>
              <button type="submit">{id ? 'Update Student' : 'Add Student'}</button>
            </form>
          </div>
        </div>
        <div className="infoSide1">
          <div className="formWrap">
            <h2>{id ? 'Edit Student Details' : 'Add Student Details'}</h2>
            <p>{id ? 'Update the details of the student.' : 'Fill out the form to add a new student.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
