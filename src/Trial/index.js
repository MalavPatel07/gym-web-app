import React from 'react';
import './trial.css';
  
function Trial() {
  return (
    <div className="trial">
      <h2>Welcome to our Gym Web Application Trial</h2>
      <p>
        This Gym Web Application is a full-stack project built using React for the frontend, Node.js for the backend, and MongoDB as the database. It is designed to facilitate gym management and user interaction by categorizing users into three roles: Members, Admin, and Trainer, each with different functionalities and access levels.
      </p>
      <p>
        To get started, you can register for an account and log in using the provided dummy account details below. Once logged in, you'll be able to explore and test out the various functionalities of our application. If you just want to see the functionality, you can use these dummy user accounts.
      </p>
      <h3>Features</h3>
      <ul>
        <li><strong>Roles and Access Levels:</strong>
          <ul>
            <li>Admin: Complete access to all functionalities.</li>
            <li>Trainer: Conditional access based on assigned permissions.</li>
            <li>Member: Three types of members with varying functionalities.</li>
          </ul>
        </li>
        <li><strong>Core Functionalities:</strong>
          <ul>
            <li>User Registration and Authentication.</li>
            <li>Profile Management for Members, Trainers, and Admin.</li>
            <li>Workout and Diet Plan Management.</li>
            <li>Progress Tracking and Analytics.</li>
            <li>Feedback and Communication System.</li>
          </ul>
        </li>
      </ul>
      <h3>Dummy Account Details:</h3>
      <ul>
        <li>User Type: Admin - admin1@example.com / password123</li>
        <li>User Type: Trainer - trainer1@example.com / password123</li>
        <li>User Type: Member (Gold) - member3@example.com / password123</li>
        <li>User Type: Member (Premium) - mihir@gmail.com / pass123</li>
        <li>User Type: Member (Platinum) - aditya@gmail.com / pass123</li>
      </ul>
    </div>
  );
}

export default Trial;
