import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { useInserData } from '../../Hooks/UseInsertData';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const HandleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await useInserData('/api/register', { email, password, name, password_confirmation: passwordConfirmation });
      localStorage.setItem('token', response.token);
      navigate('/login');
    } catch (error) {
      setError('Could not register user.');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={HandleRegister}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <div style={{ marginLeft: "100px" }}>
          <label>Password Confirmation:</label>
          <input type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;