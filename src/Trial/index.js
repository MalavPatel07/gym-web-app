import React from 'react';

function Trial() {
  return (
    <div>
      <h2>Welcome to our Gym Web Application Trial</h2>
      <p>
        This Gym Web Application is a full-stack project built using React for the frontend, Node.js for the backend, and MongoDB as the database. It is designed to facilitate gym management and user interaction by categorizing users into three roles: Members, Admin, and Trainer, each with different functionalities and access levels.
      </p>
      <h3>Features:</h3>
      <p><strong>Roles and Access Levels:</strong></p>
      <ul>
        <li><strong>Admin:</strong> Complete access to all functionalities. Can manage members and trainers.</li>
        <li><strong>Trainer:</strong> Conditional access based on assigned permissions. Can track member progress and provide feedback.</li>
        <li><strong>Member:</strong> Three types of members with varying functionalities:
          <ul>
            <li>Type 1: Access to basic workout plans and basic tracking.</li>
            <li>Type 2: Includes exercise descriptions along with workout plans and specific goal tracking.</li>
            <li>Type 3: Members with access to personalized training and diet plans.</li>
          </ul>
        </li>
      </ul>
      <p><strong>Core Functionalities:</strong></p>
      <ul>
        <li>User Registration and Authentication.</li>
        <li>Profile Management for Members, Trainers, and Admin.</li>
        <li>Workout and Diet Plan Management.</li>
        <li>Progress Tracking and Analytics.</li>
        <li>Feedback and Communication System.</li>
      </ul>
      <p>
        To get started, you can register for an account and log in. For those who just want to see the functionality, you can use the provided dummy account details below. Once logged in, you'll be able to explore and test out the various functionalities of our application.
      </p>
      <h3>Dummy Account Details:</h3>
      <ul>
        <li>User Type: Admin | User ID: admin1@example.com | Password: password123</li>
        <li>User Type: Trainer | User ID: trainer1@example.com | Password: password123</li>
        <li>User Type: Member (Gold) | User ID: member3@example.com | Password: password123</li>
        <li>User Type: Member (Premium) | User ID: mihir@gmail.com | Password: pass123</li>
        <li>User Type: Member (Platinum) | User ID: aditya@gmail.com | Password: pass123</li>
      </ul>
      <p>
        If you are new to the application, we recommend starting by registering for an account to experience the full range of functionalities. If you prefer to explore without creating an account, feel free to log in using any of the dummy account details provided above.
      </p>
    </div>
  );
}

export default Trial;

