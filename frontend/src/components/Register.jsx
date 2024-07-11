import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = ({}) => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        role,
        username,
        password,
        email,
        name,
        rollNumber: role === 'student' ? rollNumber : undefined,
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('Registration failed');
    }
  };

  return (
    <div className='mx-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col my-10'>
      <h1 className='text-3xl font-bold text-center py-4'>Register</h1>
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
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        {role === 'student' && (
          <label>
            Roll Number:
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </label>
        )}
        <br />
        <button type="submit">Register</button>
      </form>
      <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
    </div>
  );
};

export default Register;