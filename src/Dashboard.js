import React, { useState, useEffect } from "react";
import "./Dashboard.css"; // Import CSS file for styling

const Dashboard = () => {
  const [userCount, setUserCount] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [api, setApi] = useState(null);
  const [geolocationSupported, setGeolocationSupported] = useState(true); // Default to true

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setGeolocationSupported(false);
      return; // Exit the useEffect
    }

    // Fetch data from the API for user count
    fetch("https://655500aa63cafc694fe75243.mockapi.io/aman")
      .then((response) => response.json())
      .then((data) => {
        // Set the user count
        setUserCount(data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setApi(`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d120640.46327888571!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1707567346164!5m2!1sen!2sin&zoom=20px`);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );

    // Set current date
    const currentDate = new Date().toLocaleDateString();
    setCurrentDate(currentDate);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card">
        <h3>Number of Users</h3>
        <p>{userCount !== null ? userCount : "Loading..."}</p>
      </div>
      {geolocationSupported ? (
        <div className="card">
          <h3>Location</h3>
          <p>
            {latitude !== null && longitude !== null
              ? `${latitude}, ${longitude}`
              : "Loading..."}
          </p>
        </div>
      ) : (
        <div className="card">
          <h3>Location</h3>
          <p>Geolocation is not supported by this browser.</p>
        </div>
      )}
      <div className="card">
        <h3>Current Date</h3>
        <p>{currentDate !== null ? currentDate : "Loading..."}</p>
      </div>
      <div className="card">
        <h3>Time</h3>
        <p>{new Date().toLocaleTimeString()}</p>
      </div>
      {api && (
        <div className="card">
          <h3>Location </h3>
          <iframe
            title="location"
            src={api}
            width="100%"
            height="300px"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 