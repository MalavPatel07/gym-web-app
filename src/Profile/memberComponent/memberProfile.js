import React from 'react';
import './../profile.css';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

const MemberProfile = () => {
    const { userId } = useParams();
    const userSessionString = sessionStorage.getItem('userSession');
    const userSession = JSON.parse(userSessionString);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        dob: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        userType: '',
        membershipType: '',
        dateOfJoining: '',
        userType: ''
    });
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BASE}/users/${userId}`);
                setSelectedUser(response.data);
                setFormData({ ...response.data });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (userId) {
            fetchUserData();
        }
    }, [userId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            const response = await axios.put(`${REACT_APP_BASE}/userDetails/updateUser/${formData.user_id}`, formData);
            setMessage('Details updated successfully!');
        } catch (error) {
            setIsError(true);
            setMessage('Error updating details: ' + (error.response?.data?.message || error.message));
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`${REACT_APP_BASE}/userDetails/${selectedUser.user_id}`);
            navigate('/profile');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (!selectedUser) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div>
            <div className="container memberprofile">
                <form>
                    <h2 className="mb-3">Member Details</h2>
                    {userSession.userType == "Admin" && (
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="memberUsername" className="form-label">User Id</label>
                                <input type="text" className="form-control" id="user_id" placeholder="Username" value={formData.user_id} disabled onChange={handleInputChange} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="memberEmail" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Email" value={formData.email} disabled onChange={handleInputChange} />
                            </div>

                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="memberFullName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" placeholder="Full Name" value={formData.firstname} disabled onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="memberFullName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Full Name" value={selectedUser.lastname} disabled onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="memberAge" className="form-label">Age</label>
                            <input type="number" className="form-control" id="age" placeholder="Age" value={formData.age} disabled onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="memberDob" className="form-label">Date of birth</label>
                            <input type="date" className="form-control" id="dob" value={formatDate(formData.dob)} disabled onChange={handleInputChange} />
                        </div>
                    </div>


                    {userSession.userType !== "Member" && (
                        <>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="memberPhone" className="form-label">Phone</label>
                                    <input type="number" className="form-control" id="phone" placeholder="Phone Number" value={formData.phone} disabled onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="memberGender" className="form-label">Gender</label>
                                    <input type="text" className="form-control" id="gender" value={formData.gender} disabled onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="memberWeight" className="form-label">Weight</label>
                                    <input type="number" className="form-control" id="weight" placeholder="Weight in kg" value={formData.weight} disabled onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="memberHeight" className="form-label">Height</label>
                                    <input type="number" className="form-control" id="height" placeholder="Height in cm" value={formData.height} disabled onChange={handleInputChange} />
                                </div>

                            </div>
                            {userSession.userType !== "Trainer" && (<>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="memberUserType" className="form-label">User Type</label>
                                        <select className="form-control" id="userType" value={formData.userType} onChange={handleInputChange}>
                                            <option selected>Member</option>
                                            <option>Trainer</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="memberMembershipType" className="form-label">Membership Type</label>
                                        <select className="form-control" id="membershipType" value={formData.membershipType} onChange={handleInputChange}>
                                            <option>Gold</option>
                                            <option>Premium</option>
                                            <option>Platinum</option>
                                        </select>
                                    </div>
                                </div><div className="row">
                                    <div className="col-md-12">
                                        <button type="button" onClick={handleSubmit} className="btn btn-primary w-25">Update</button>
                                        <button type="button" onClick={handleDelete} className="btn btn-danger w-25">Delete</button>
                                    </div>
                                </div>
                            </>
                            )}
                            <div>
                                {message && (
                                    <div className={isError ? 'alert alert-danger' : 'alert alert-success'}>
                                        {message}
                                    </div>
                                )}
                            </div></>
                    )}
                </form>

            </div>
        </div>
    );
};

export default MemberProfile;
