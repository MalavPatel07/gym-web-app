import React from 'react';
import './content.css'; 
import icon1 from "../../images/icon-1.png";
import icon2 from "../../images/icon-2.png";
import icon3 from "../../images/icon-3.png";

function ContentSection() {
  return (
    <section id="content" style={{marginTop: -48}}>
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-lg-4 p-0">
                    <div className="d-flex align-items-center bg-black text-white px-5" style={{minHeight: 300}}>
                        <img className="icon-img" src={icon1} alt = "icon1"></img>
                        <div className="">
                            <h2 className="text-white mb-3">Workout</h2>
                            <p>Discover a variety of workout routines tailored to your fitness level and goals. From high-intensity interval training to yoga, find what moves you and start your journey towards a healthier, fitter you.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 p-0">
                    <div className="d-flex align-items-center bg-red text-white px-5" style={{minHeight: 300}}>
                        <img className="icon-img" src={icon2} alt = "icon2"></img>
                        <div className="">
                            <h2 className="text-white mb-3">Progression</h2>
                            <p>Track your fitness journey with our comprehensive progression tools. Monitor your improvements, celebrate milestones, and set new goals as you advance, keeping motivated and on track.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 p-0">
                    <div className="d-flex align-items-center bg-black text-white px-5" style={{minHeight: 300}}>
                        <img className="icon-img" src={icon3} alt = "icon3"></img>
                        <div className="">
                            <h2 className="text-white mb-3">Nutrition</h2>
                            <p>Unlock the power of nutrition with personalized meal plans and expert advice. Learn how to nourish your body effectively to complement your training, boost energy levels, and achieve optimal health.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default ContentSection;
