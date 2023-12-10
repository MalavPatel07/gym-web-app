import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import lottie from 'lottie-web';
import './personalized.css';
import { useSelector } from 'react-redux';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

function PersonalizedContent() {
    const userDetails = useSelector((state) => state.user.userDetails);
    const [todaysExercises, setTodaysExercises] = useState([]);
    const userActivity = useSelector((state) => state.user.userActivity);
    const [trainerDetails, setTrainerDetails] = useState(null);
    const animationContainer = useRef(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BASE}/exercises`);
                const allExercises = response.data;
                selectRandomExercises(allExercises);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        const fetchTrainerDetails = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BASE}/trainerdetails/trainerForUser/${userDetails.user_id}`);
                console.log(response);
                setTrainerDetails(response.data);
            } catch (error) {
                console.error('Error fetching trainer details:', error);
            }
        };

        fetchExercises();
        fetchTrainerDetails();
    }, [userDetails.user_id], [userDetails.membershipType]);

    useEffect(() => {
        if (userDetails.membershipType === "Gold") {
            const anim = lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'animations/Animation2.json'
            });

            return () => anim.destroy(); 
        }
    }, [userDetails.membershipType]);

    const selectRandomExercises = (allExercises) => {
        let selectedExercises = [];
        for (let i = 0; i < 4 && allExercises.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * allExercises.length);
            selectedExercises.push(allExercises[randomIndex]);
            allExercises.splice(randomIndex, 1);
        }
        setTodaysExercises(selectedExercises);
    };

    const bmi = userDetails.weight / Math.pow(userDetails.height / 100, 2);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    if (!userActivity) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <section id="personalizedContent" style={{ marginTop: -48 }}>
            <div className="container my-5">
                <div id="userWelcome" className="text-left">
                    <h3>Welcome, <span id="userName">{userDetails.firstname} {userDetails.lastname}</span></h3>
                </div>
                <div className="row personalized-section">
                    <div className="col-md-4 personalized-column">
                        <div id="progressTracking" className="my-4">
                            <h3>Your <span id="userName">Progress</span></h3>
                            <div className="progress-details">
                                <p><strong>Workout Hours This Month:</strong> <span id="workoutHours">{userActivity.gym_hours} hours</span></p>
                                <p><strong>Total Workouts Completed:</strong> <span id="totalWorkouts">{userActivity.gym_sessions} sessions</span></p>
                                <p><strong>Current Weight:</strong> <span id="currentWeight">{userActivity.current_weight} kg</span></p>
                                <p><strong>Target Weight:</strong> <span id="targetWeight">{userActivity.target_weight} kg</span></p>
                                <p><strong>Current BMI:</strong> <span id="bmiResult">{bmi.toFixed(2)}</span></p>
                            </div>
                        </div>
                    </div>
                    {userDetails.membershipType === "Gold" && (
                        <div className="col-md-8 personalized-column">
                            <div ref={animationContainer} style={{ height: 300 }}></div>
                        </div>
                    )}

                    {(userDetails.membershipType === "Premium" || userDetails.membershipType === "Platinum") && (
                        <>
                            <div className="col-md-4 personalized-column">
                                <div id="todaysSchedule" className="my-4">
                                    <h3>Today's <span id="userName">Workout</span> Schedule</h3>
                                    <div className="schedule-details">
                                        <p><strong>Trainer:</strong> {trainerDetails ? trainerDetails.trainerName : 'No Trainer Assigned'}</p>
                                        <div id="todaysWorkout">
                                            <h4>Today's <span>Exercises</span></h4>
                                            <ul>
                                                {todaysExercises.map((exercise, index) => (
                                                    <li key={index}>
                                                        {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 personalized-column">
                                <div id="weightProgressionChart">
                                    <h4><span id="userName">Goal</span> Tracking</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Weight (kg)</th>
                                                <th>Target Weight (kg)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userActivity && userActivity.weight_history ? (
                                                userActivity.weight_history.map(({ date, weight }) => (
                                                    <tr key={date}>
                                                        <td>{formatDate(date)}</td>
                                                        <td>{weight}</td>
                                                        <td>{userActivity.target_weight}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="3">Loading...</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>)}
                </div>
            </div>
        </section>
    );
}

export default PersonalizedContent;