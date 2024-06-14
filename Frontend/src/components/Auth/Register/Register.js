import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const role = 'student'; 
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
            history.push('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bodyWrap">
            <div className="contentLoginWrap1">
                <div className="loginSide">
                    <div className="loginWrap formBorder"> 
                        <form className="registerForm" onSubmit={handleSubmit}>
                        <h2>Register</h2>
                        
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                           <button type="submit">Register</button>
                        </form>
                        <p className="registerPrompt">
                           Alredy have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
                <div className="hello22">
                    <div className="loginWrap">
                        <h2>Hello again!</h2>
                        <p style={{ color: 'white' }}>Register in to your account to get access to system.</p>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
