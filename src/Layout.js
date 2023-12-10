import React from 'react';
import Navbar from './gymNavigation/index.js';
import Footer from './gymFooter/index.js';
import { Outlet } from 'react-router-dom';

function Layout({ isLoggedIn, setLoggedIn, userDetails }) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}  userDetails={userDetails} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
