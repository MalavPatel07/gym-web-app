import React from 'react';
import './personalized.css'; 

function PersonalizedContent({userDetails}) {
    const bmi = userDetails.weight / Math.pow(userDetails.height / 100, 2);
  return (
    <section id="personalizedContent" style= {{marginTop:-48}}>
        <div className="container my-5">
            <div id="userWelcome" className="text-left">
                <h3>Welcome, <span id="userName">{userDetails.firstname} {userDetails.lastname}</span></h3>
            </div>
            <div className="row personalized-section">
                <div className="col-md-4 personalized-column">
                    <div id="progressTracking" className="my-4">
                        <h3>Your <span id="userName">Progress</span></h3>
                        <div className="progress-details">
                            <p><strong>Workout Hours This Month:</strong> <span id="workoutHours">40 hours</span></p>
                            <p><strong>Total Workouts Completed:</strong> <span id="totalWorkouts">25 sessions</span></p>
                            <p><strong>Current Weight:</strong> <span id="currentWeight">70 kg</span></p>
                            <p><strong>Target Weight:</strong> <span id="targetWeight">65 kg</span></p>
                            <p><strong>Current BMI:</strong> <span id="bmiResult">{bmi.toFixed(2)}</span></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 personalized-column">
                    <div id="todaysSchedule" className="my-4">
                        <h3>Today's <span id="userName">Workout</span> Schedule</h3>
                        <div className="schedule-details">
                            <p><strong>Evening Strength Training:</strong> 6:00 PM - 7:00 PM with Instructor Emily Wright</p>
                            <div id="todaysWorkout">
                                <h4>Today's <span id="userName">Exercises</span></h4>
                                <ul>
                                    <li>Deadlifts - 4 sets of 8 reps</li>
                                    <li>Squats - 3 sets of 10 reps</li>
                                    <li>Bench Press - 3 sets of 8 reps</li>
                                    <li>Rowing Machine - 15 minutes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 personalized-column">
                    <div id="weightProgressionChart">
                        <h4><span id="userName">Goal</span> Tracking</h4>
                        <img src="path_to_chart_image.jpg" alt="Weight Progression Chart"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default PersonalizedContent;

