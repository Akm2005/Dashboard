import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css'
import Profile from './Profile';
import Dashboard from './Dashboard';

const Main = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [content ,setcontent] = useState(<Dashboard/>);

  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = sessionStorage.getItem('userid');

    const fetchUserEmail = async () => {
      try {
        // Make a request to the API using the user ID
        const response = await fetch(`https://655500aa63cafc694fe75243.mockapi.io/aman/${userId}`);
        const userData = await response.json();
        // Extract user's email from the API response
        const email = userData.email;
        // Set the user's email in state
        setUserEmail(email);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userId) {
      // Call the function to fetch user email if userId is available
      fetchUserEmail();
    }
  }, []); // Empty dependency array to ensure this effect runs only once

  const handlelogout = ()=>{ 
    sessionStorage.clear();
    navigate('/');
  }
  const handleprofile = ()=>{
    setcontent(<Profile />)
  }
  const handledash = ()=>{
    setcontent(<Dashboard />)
  }
  return (
    <>
    <div className='nav'>
      <h1>Welcome, {userEmail}! </h1>
      <button className='btnmain' onClick={handlelogout}>Logout</button>
    </div>
    <div className='main'>
      <div className='leftbar'>
        <button className='btnleft' onClick={handledash}>Dashboard</button>
        <button className='btnleft' onClick={handleprofile}>Profile</button>
        <button className='btnleft'>Users</button>
        <button className='btnleft'>Roles</button>
        <button className='btnleft' onClick={handlelogout}>Logout</button>
      </div>
      <div className='maincontent'>
       {content}
      </div>
    </div>
    </>
  );
};

export default Main;
