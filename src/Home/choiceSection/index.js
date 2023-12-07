import React from 'react';
import feature1 from "../../images/feature-1.jpg";
import feature2 from "../../images/feature-2.jpg";
import feature3 from "../../images/feature-3.jpg";
import feature4 from "../../images/feature-4.jpg";

function ChoiceSection() {
  return (
    <section id="choice">
        <div className="container feature pt-5">
            <div className="d-flex flex-column text-center mb-5">
                <h4 className="font-weight-bold red-highlight">Why Choose Us?</h4>
                <h4 className="display-4 font-weight-bold">Benefits of Joining Our Gym</h4>
            </div>
            <div className="row">
                <div className="col-md-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-sm-5">
                            <img className="img-fluid mb-3 mb-sm-0" src={feature1} alt="feature1"/>
                        </div>
                        <div className="col-sm-7">
                            <h4 className="font-weight-bold">Video Instruction</h4>
                            <p>Access a wide range of workout tutorials and guided video sessions by fitness experts. Perfect for learning new exercises or refining your technique from the comfort of your home.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-sm-5">
                            <img className="img-fluid mb-3 mb-sm-0" src={feature2} alt="feature2"/>
                        </div>
                        <div className="col-sm-7">
                            <h4 className="font-weight-bold">Training Calendar</h4>
                            <p>Stay on track with a personalized training calendar. Plan your workouts, set goals, and monitor your progress over time to ensure consistent improvement and growth.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-sm-5">
                            <img className="img-fluid mb-3 mb-sm-0" src={feature3} alt="feature3"/>
                        </div>
                        <div className="col-sm-7">
                            <h4 className="font-weight-bold">Free Apps & WiFi</h4>
                            <p>Enjoy free access to our fitness app and in-gym WiFi. Track your workouts, connect with fellow gym-goers, and stream your favorite workout playlists without any interruptions.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-5">
                    <div className="row align-items-center">
                        <div className="col-sm-5">
                            <img className="img-fluid mb-3 mb-sm-0" src={feature4} alt="feature4"/>
                        </div>
                        <div className="col-sm-7">
                            <h4 className="font-weight-bold">Community Support</h4>
                            <p>Become part of a supportive fitness community. Join group classes, participate in events, and share your journey with like-minded individuals who are here to motivate and inspire you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default ChoiceSection;
