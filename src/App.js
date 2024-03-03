import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from "./Home/index.js";
import Login from "./userAuth/login.js";
import Register from "./userAuth/register.js";
import Nutrition from './Nutrition/index.js';
import UserProfile from './Profile/index.js';
import Profile from './Profile/index.js';
import { Provider } from 'react-redux';
import { store } from './store.js';
import MemberProfile from './Profile/memberComponent/memberProfile.js';
import DataLoader from './dataLoader.js';
import Exercise from './Activity/index.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userDetails')) || {});

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(sessionStorage.getItem('userDetails')) || {});
    }
  }, []);

  const handleLogin = (status, details) => {
    setIsLoggedIn(status);
    setUserDetails(details);
    sessionStorage.setItem('isLoggedIn', status);
    sessionStorage.setItem('userDetails', JSON.stringify(details));
  };

  return (
    <Provider store={store}>
      <Router>
        <DataLoader/>
        <Routes>
          <Route element={<Layout isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} userDetails={userDetails} />}>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/trial" element={<Trial />} />
            <Route path="/home" element={<Home isLoggedIn={isLoggedIn} userDetails={userDetails}/>} />
            <Route path="/nutrition" element={<Nutrition isLoggedIn={isLoggedIn} userDetails={userDetails} />} />
            <Route path="/profile" element={<Profile userDetails={userDetails} />} />
            <Route path="/profile/:userId" element={<MemberProfile/>} />
            <Route path="/activity" element={<Exercise/>} />
          </Route>
          <Route path="/login" element={<Login setLoggedIn={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
