import React from 'react';
import './nav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

function Navbar({ isLoggedIn, setLoggedIn }) {
    const userDetails = useSelector((state) => state.user.userDetails);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get(`${REACT_APP_BASE}/users/logout`);
            sessionStorage.clear();
            setLoggedIn(false);
            navigate("/");
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
            <div className="container">
                <Link className="navbar-brand" to="/">CrossFit</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className={`${pathname.includes("home") ? "active" : ""} nav-link`} to="/">Home</Link>
                        </li>
                        {isLoggedIn && (<>
                            <li className="nav-item">
                                <Link className={`${pathname.includes("profile") ? "active" : ""} nav-link`} to="/profile">Profile</Link>
                            </li>
                            {userDetails.membershipType !== "Gold" && (<>
                                <li className="nav-item">
                                    <Link className={`${pathname.includes("activity") ? "active" : ""} nav-link`} to="/activity">Activity</Link>
                                </li>
                                {userDetails.membershipType !== "Premium" && (<>
                                    <li className="nav-item">
                                        <Link className={`${pathname.includes("nutrition") ? "active" : ""} nav-link`} to="/nutrition">Nutrition</Link>
                                    </li>
                                </>
                                )}
                            </>
                            )}
                        </>
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
