import React from 'react';
import './hero.css'; 
import gym from "../../images/gym.jpg"
function HeroSection() {
  return (
    <section className="hero-section">
      <img src={gym} alt="Gym" className="hero-image" />
      <div className="hero-text">
        <blockquote className="blockquote">
          <p className="mb-0">"Train Harder and Grow Bigger!"</p>
          <footer className="blockquote-footer">Ronnie Coleman</footer>
        </blockquote>
      </div>
    </section>
  );
}

export default HeroSection;
