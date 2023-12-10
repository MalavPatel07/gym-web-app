import React, { useEffect } from 'react';
import './../profile.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { setUserDetails } from '../../userSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

const TrainerProfile = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const userDetails = useSelector((state) => state.user.userDetails);
    const userSessionString = sessionStorage.getItem('userSession');
    const userSession = JSON.parse(userSessionString);
    const [myUsers, setMyUsers] = useState([]);
    const allUserDetails = useSelector((state) => state.user.allUserDetails);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BASE}/trainerdetails/trainMembers/${userDetails.user_id}`);
                setMyUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMembers();
    }, [userDetails]);
    const filteredUserDetails = allUserDetails.filter(member =>
        `${member.firstname} ${member.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
        myUsers.includes(member.user_id)
    );
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const initialState = {
        user_id: userDetails.user_id,
        email: userSession.email,
        userType: userSession.userType,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        phone: userDetails.phone,
        dob: userDetails.dob,
        age: userDetails.age,
        gender: userDetails.gender,
        weight: userDetails.weight,
        height: userDetails.height,
        membershipType: userDetails.membershipType,
        dateOfJoining: userDetails.dateOfJoining
    };
    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            const response = await axios.put(`${REACT_APP_BASE}/userDetails/updateUser/${formData.user_id}`, formData);
            setMessage('Details updated successfully!');
            setTimeout(() => setMessage(''), 3000);
            const updatedUserSession = { ...userSession, email: formData.email };
            sessionStorage.setItem('userSession', JSON.stringify(updatedUserSession));
            dispatch(setUserDetails(formData));
        } catch (error) {
            setIsError(true);
            setMessage('Error updating details: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(''), 3000);
        }
    };
    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className='col-md-12 welcomemsg'>
                    <h2>Welcome, <span id="usernameDisplay">{userDetails.firstname}</span></h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 trainerdetails">
                    <h3>Trainer Details</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">User Id</label>
                            <input type="text" className="form-control" id="user_id" placeholder="User Id" value={formData.user_id} onChange={handleInputChange} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dob"
                                value={formatDate(formData.dob)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" className="form-control" id="age" value={formData.age} placeholder="Age" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-control" id="gender" value={formData.gender || ''} onChange={handleInputChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="weight" className="form-label">Weight</label>
                            <input type="number" className="form-control" id="weight" placeholder="Weight in kg" value={formData.weight} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="height" className="form-label">Height</label>
                            <input type="number" className="form-control" id="height" placeholder="Height in cm" value={formData.height} onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Changes</button>
                    </form>
                    <br />
                    <div>
                        {message && (
                            <div className={isError ? 'alert alert-danger' : 'alert alert-success'}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-6 searchwindow">
                    <form className="input-group">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search Members"
                            aria-label="Search"
                            style={{ height: "45px" }}
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                        <button className="btn btn-outline-secondary" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                    <br /><br />
                    <div className="row">
                        {filteredUserDetails.map((member, index) => {
                            const avatarUrl = `https://ui-avatars.com/api/?name=${member.firstname.charAt(0)}&background=random&color=fff&size=100`;

                            return (
                                <div className="col-md-6 mb-4" key={index}>
                                    <Link className="no-text-decoration" to={`/profile/${member.user_id}`}>
                                        <div className="card member-card h-100 shadow-sm">
                                            <img src={avatarUrl} className="card-img-top rounded-circle mt-4 mx-auto" alt="Profile" style={{ width: '100px', height: '100px' }} />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{`${member.firstname} ${member.lastname}`}</h5>
                                                <p className="card-text">ID: {member.user_id}</p>
                                                <p className="card-text">Age: {member.age}</p>
                                                <p className="card-text">Gender: {member.gender}</p>
                                                <p className="card-text">Joined: {formatDate(member.dateOfJoining)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                        {/* More member cards can be added here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerProfile;
