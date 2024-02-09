import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [mode, setMode] = useState('login'); // Default mode is 'login'
  const navigate = useNavigate();
  const URL = 'https://655500aa63cafc694fe75243.mockapi.io/aman';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Code to handle login (matching credentials)
      const response = await fetch(URL);
      const data = await response.json();
      const user = data.find(item => item.email === loginEmail && item.password === loginPassword);
      if (user) {
        sessionStorage.setItem('userid', user.id);
        navigate('/main');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch all users from the API
      const response = await fetch(URL);
      const users = await response.json();
  
      // Check if the provided email already exists
      const emailExists = users.some(user => user.email === registerEmail);
  
      if (emailExists) {
        // If email already exists, show alert
        alert('Email already exists. Please try with another email.');
      } else {
        // If email does not exist, proceed with registration
        const registrationResponse = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: registerEmail, password: registerPassword }),
        });
        
        if (registrationResponse.ok) {
          // Display alert after successful registration
          alert('Registration successful! Now you can login.');
          // Clear registration form fields after successful registration
          setRegisterEmail('');
          setRegisterPassword('');
        } else {
          // Handle registration error
          alert('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const toggleMode = () => {
    // Toggle between 'login' and 'register' modes
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="container">
      <div className='card1'>
        {mode === 'login' && (
          <form className='login-form' onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <input type='email' placeholder='Enter Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type='password' placeholder='Enter Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            <button className='btnhome' type='submit'>Login</button>
          </form>
        )}
        {mode === 'register' && (
          <form className='register-form' onSubmit={handleRegistrationSubmit}>
            <h1>Register</h1>
            <input type='email' placeholder='Enter Email' value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
            <input type='password' placeholder='Enter Password' value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
            <button className='btnhome' type='submit'>Register</button>
          </form>
        )}
        <br/>
        <button className='btnhome' onClick={toggleMode}>
          {mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default Home;
