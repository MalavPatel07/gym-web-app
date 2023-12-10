import React from 'react';
import './member.css';
import { useSelector } from 'react-redux';

function TotalMembersSectionB() {
  const userCount = useSelector((state) => state.user.userCount);
  return (
    <section id="totalMembersB" className="text-center my-5">
        <h2 className="display-4B">Our <span className="red-highlight">Growing</span> Community</h2>
        <p className="leadB">Join our ever-expanding family</p>
        <div className="total-members-countB">
            <span className="count-numberB">{userCount}</span>
            <span className="count-labelB">Members and Counting!</span>
        </div>
    </section>
  );
}

export default TotalMembersSectionB;
