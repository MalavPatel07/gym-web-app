import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar({ isLoggedIn , setLoggedIn, userDetails}) {
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:4000/users/logout');
            sessionStorage.clear();
            setLoggedIn(false);
        } catch (error) {
            console.error('Logout error', error);
        }
    };
    const isPlatinumMember = userDetails.membershipType === 'Platinum';
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
            <Link className="navbar-brand" to="/">CrossFit</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/activity">Activity</Link>
                    </li>
                    {isPlatinumMember && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/nutrition">Nutrition</Link>
                    </li>
                    )}
                </ul>
                <div className="form-inline">
                    {console.log(handleLogout)}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="btn btn-outline-danger my-2 my-sm-0">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline-danger my-2 my-sm-0">Login</Link>
                            <Link to="/register" className="btn btn-outline-danger my-2 my-sm-0 ml-2">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
