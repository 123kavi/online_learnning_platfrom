import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './userstyles.css';

const StudentManagement = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = (user) => {
    navigate(`/add-student/${user.id}`);
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <div className="button-group">
        <Link to="/add-student">
          <button className='button1'>Add Student</button>
        </Link>
        <Link to="/home">
          <button className='button2'>Go to Home Page</button>
        </Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="action-buttons">
                <button className='button3' onClick={() => handleUpdateUser(user)}>Update</button>
                <button className='button3'onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
