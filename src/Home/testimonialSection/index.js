import React, { useState } from 'react';
import './test.css';
import profile from "../../images/profile.jpg";
import { useSelector } from 'react-redux';
function TestimonialSection() {
    const allUserDetails = useSelector((state) => state.user.allUserDetails);
    return (
        <section id="testimonials">
            <div id="carouselExampleControls" className="carousel slide" data-ride="false">
                <div className="carousel-inner">
                    {allUserDetails.map((user, index) => (
                        <div key={user.user_id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <h2>{user.testimonial}</h2>
                            <img className="test-img" src={profile} alt="profile" />
                            <em>{user.firstname} {user.lastname}</em>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </section>
    );
}

export default TestimonialSection;
