
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './login.css';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

export default function Register() {
  useEffect(() => {
    document.body.classList.add('loginPageBody');
    return () => {
      document.body.classList.remove('loginPageBody');
    };
  }, []);

  const uniqueUserId = uuidv4();
  const [formData, setFormData] = useState({
    user_id: uniqueUserId,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    dob: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    membershipType: '',
    dateOfJoining: new Date().toISOString().slice(0, 10),
    userType: 'Member'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const registerData = { ...formData };
        console.log(registerData);
        const response = await axios.post(`${REACT_APP_BASE}/userDetails/combinedRegister`, registerData, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
            navigate('/login');
        } else {
            alert('Registration failed!');
        }
    } catch (error) {
        console.error('Registration error', error);
    }
};

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: 100 }}>
        <div className="loginPageCard shadow" style={{ width: 600 }}>
            <div className="card-body p-5">
                <h2 className="card-title text-center mb-4">Sign Up</h2>
                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label for="email">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Email address" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="firstname">Firstname</label>  
                            <input type="firstname" className="form-control" id="firstname" placeholder="Firstname" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="lastname">Lastname</label>  
                            <input type="lastname" className="form-control" id="lastname" placeholder="Lastname" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="phone">Phone number</label>
                            <input type="tel" className="form-control" id="phone" placeholder="Phone number" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="userType">User Type</label>
                            <input type="text" className="form-control" id="userType" value="Member" onChange={handleChange} disabled/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="dob">Date of Birth</label>
                            <input type="date" className="form-control" id="dob" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="age">Age</label>
                            <input type="number" className="form-control" id="age" placeholder="Age" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="gender">Gender</label>
                            <select className="form-control" id="gender" onChange={handleChange}>
                            <option value="" disabled selected>Select your option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="weight">Weight</label>
                            <input type="number" className="form-control" id="weight" placeholder="Weight in kg" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="height">Height</label>
                            <input type="number" className="form-control" id="height" placeholder="Height in cm" onChange={handleChange} required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="membershipType">Membership Type</label>
                            <select className="form-control" id="membershipType" onChange={handleChange}>
                                <option value="" disabled selected>Select your option</option>
                                <option value="Gold">Gold</option>
                                <option value="Premium">Premium</option>
                                <option value="Platinum">Platinum</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-grid mb-2">
                        <button className="btn btn-lg btn-outline-red btn-block" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}
