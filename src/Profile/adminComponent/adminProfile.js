import React, { useState } from 'react';
import './../profile.css'; // Ensure the path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const userDetails = useSelector((state) => state.user.userDetails);
    const [searchTerm, setSearchTerm] = useState('');
    const allUserDetails = useSelector((state) => state.user.allUserDetails);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUserDetails = allUserDetails.filter(member =>
        `${member.firstname} ${member.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="container-fluid adminprofile">
            <div className="row">
                <div className='col-md-4 mb-4 welcomemsg'>
                    <h2>Welcome, <span id="usernameDisplay">{userDetails.firstname}</span></h2>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
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
                </div>
            </div>

            <div className="row">
                {filteredUserDetails.map((member, index) => {
                    const avatarUrl = `https://ui-avatars.com/api/?name=${member.firstname.charAt(0)}&background=random&color=fff&size=100`;

                    return (
                        <div className="col-md-3 mb-4" key={index}>
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
            </div>

        </div>
    );
};

export default AdminProfile;
