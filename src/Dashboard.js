import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://655500aa63cafc694fe75243.mockapi.io/aman')
      .then(response => response.json())
      .then(data => {
        // Set the user count
        setUserCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="dashboard-container"> 
     <div className="card">
       
        <h3>Number of Users</h3>
        <p>{userCount !== null ? userCount : 'Loading...'}</p>
      </div>
      <div className="card">
        <h2>Card 1</h2>
        <p> Card 1</p>
      </div>
      <div className="card">
        <h2>Card 2</h2>
        <p> Card 2</p>
      </div>
      <div className="card">
        <h2>Card 3</h2>
        <p> Card 3</p>
      </div>
      <div className="card">
        <h2>Card 4</h2>
        <p> Card 4</p>
      </div>
      <div className="card">
       
        <h2>Card 5</h2>
        <p> Card 5</p>
      </div>
      <div className="card">
        <h2>Card 6</h2>
        <p> Card 6</p>
      </div>
      <div className="card">
        <h2>Card 7</h2>
        <p> Card 7</p>
      </div>

     
    </div>
  );
};

export default Dashboard;
