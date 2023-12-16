# Gym Web Application

https://dulcet-mandazi-492f9b.netlify.app

## Description

This Gym Web Application is a full-stack project built using React for the frontend, Node.js for the backend, and MongoDB as the database. It is designed to facilitate gym management and user interaction by categorizing users into three roles: Members, Admin, and Trainer, each with different functionalities and access levels.

## Features

### Roles and Access Levels

1. **Admin**
   - Complete access to all functionalities.
   - Can manage members and trainers.

2. **Trainer**
   - Conditional access based on assigned permissions.
   - Can track member progress and provide feedback.

3. **Member**
   - Three types of members with varying functionalities:
     - **Type 1**: Access to basic workout plans and basic tracking.
     - **Type 2**: Includes exercise descriptions along with workout plans and specific goal tracking.
     - **Type 3**: Members with access to personalized training and diet plans.

### Core Functionalities

- User Registration and Authentication.
- Profile Management for Members, Trainers, and Admin.
- Workout and Diet Plan Management.
- Progress Tracking and Analytics.
- Feedback and Communication System.



## Setup and Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   npm start
