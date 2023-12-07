import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pricing.css'; 

function PricingSection() {
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate('/register');
  };

  return (
    <section id="pricing">
        <h2 className="price-head">Gym <span className="red-highlight">Membership</span> Plans</h2>
        <p>Simple and affordable price plans for you.</p><br />
        <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3>Gold</h3>
                    </div>
                    <div className="card-body">
                        <h2 className="card-heading">49$/Month</h2>
                        <p>Goal Tracking</p>
                        <p>Access to Exercises</p>
                        <p>BMI Tracking</p>
                        <button className="btn btn-lg btn-outline-red btn-block" type="button" onClick={handleJoinNowClick}>Join Now</button>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3>Premium</h3>
                    </div>
                    <div className="card-body">
                        <h2 className="card-heading">69$/Month</h2>
                        <p>Goal Tracking</p>
                        <p>Personal Trainer</p>
                        <p>Daily Workouts</p>
                        <button className="btn btn-lg btn-outline-red btn-block" type="button" onClick={handleJoinNowClick}>Join Now</button>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h3>Platinum</h3>
                    </div>
                    <div className="card-body">
                        <h2 className="card-heading">89$/Month</h2>
                        <p>Goal Tracking</p>
                        <p>Personal Trainer</p>
                        <p>Daily Workouts</p>
                        <p>Nutritional Meal Plans</p>
                        <button className="btn btn-lg btn-outline-red btn-block" type="button" onClick={handleJoinNowClick}>Join Now</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default PricingSection;
