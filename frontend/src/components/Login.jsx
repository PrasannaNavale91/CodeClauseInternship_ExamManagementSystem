import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';

const Login = ({ history }) => {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        role,
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', role);
      history.push(role === 'admin' ? '/admin' : '/student');
    } catch (error) {
      console.error(error);
      toast.error('Invalid login credentials');
    }
  };

  return (
    <div className='mx-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col my-10'>
      <h1 className='text-3xl font-bold text-center py-4'>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="select">Select role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p className='text-center my-2'>Don't have an account? <Link to="/register"> signup </Link></p>
    </div>
  );
};

export default Login;