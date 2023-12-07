import React from 'react';
import './totalMembers.css';

function TotalMembersSection({ userCount }) {
  return (
    <section id="totalMembers" className="text-center">
        <h2 className="display-4A">Our <span className="white-highlight">Growing</span> Community</h2>
        <p className="lead">Join our ever-expanding family</p>
        <div className="total-members-count">
            <span className="count-number">{userCount}</span>
            <span className="count-label">Members and Counting!</span>
        </div>
    </section>
  );
}

export default TotalMembersSection;
