import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from "./Home/index.js";
import Login from "./userAuth/login.js";
import Register from "./userAuth/register.js";
import Nutrition from './Nutrition/index.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userDetails')) || {});
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
      if (sessionStorage.getItem('isLoggedIn') === 'true') {
          setIsLoggedIn(true);
          setUserDetails(JSON.parse(sessionStorage.getItem('userDetails')) || {});
      }
      fetchAllUserDetails();
  }, []);

  const fetchAllUserDetails = async () => {
      try {
          const response = await fetch('http://localhost:4000/userDetails/allUsersWithCount'); 
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setAllUserDetails(data.allUserDetails);
          setUserCount(data.count);
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
  };

  const handleLogin = (status, details) => {
    setIsLoggedIn(status);
    setUserDetails(details);
    sessionStorage.setItem('isLoggedIn', status);
    sessionStorage.setItem('userDetails', JSON.stringify(details));
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn}  userDetails={userDetails}/>}>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} userDetails={userDetails} allUserDetails={allUserDetails} userCount={userCount} />} />
          <Route path="/nutrition" element={<Nutrition isLoggedIn={isLoggedIn} userDetails={userDetails} />} />
        </Route>
        <Route path="/login" element={<Login setLoggedIn={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
