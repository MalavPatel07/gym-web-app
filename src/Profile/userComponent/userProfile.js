import React, { useEffect } from 'react';
import './../profile.css';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserActivity, setUserDetails } from '../../userSlice';
import { Link } from 'react-router-dom';
const REACT_APP_BASE = process.env.REACT_APP_BASE;
const REACT_APP_BASE_NUTRITION_API = process.env.REACT_APP_BASE_NUTRITION_API;

const UserProfile = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user.userDetails);
    const allUserDetails = useSelector((state) => state.user.allUserDetails);
    const userActivity = useSelector((state) => state.user.userActivity);
    const userSessionString = sessionStorage.getItem('userSession');
    const userSession = JSON.parse(userSessionString);
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const initialState = {
        user_id: userDetails.user_id,
        email: userSession.email,
        userType: userSession.userType,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        phone: userDetails.phone,
        dob: userDetails.dob,
        age: userDetails.age,
        gender: userDetails.gender,
        weight: userDetails.weight,
        height: userDetails.height,
        membershipType: userDetails.membershipType,
        dateOfJoining: userDetails.dateOfJoining
    };
    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');
    const [weightSuccessMessage, setWeightSuccessMessage] = useState('');
    const [testimonialSuccessMessage, setTestimonialSuccessMessage] = useState('');
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const uniqueFavoriteMealIds = new Set(userDetails.favourites);
    const [uniqueFavoriteMeals, setUniqueFavoriteMeals] = useState([]);

    useEffect(() => {
        const fetchFavoriteMeals = async () => {
            try {
                const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
                    params: {
                        apiKey: REACT_APP_BASE_NUTRITION_API,
                        ids: Array.from(uniqueFavoriteMealIds).join(','),
                    },
                });

                if (!userDetails?.favourites?.length) {
                    console.log('No favourite meals to fetch');
                    return;
                }
    
                console.log("API Response:", response.data.week); 
    
                let fetchedMeals = [];
                Object.values(response.data.week).forEach(day => {
                    if (day.meals && day.meals.length > 0) {
                        fetchedMeals = fetchedMeals.concat(day.meals);
                    }
                });
    
                console.log("Fetched Meals:", fetchedMeals); 
    

                let uniqueMeals = Array.from(new Set(fetchedMeals.map(meal => JSON.stringify(meal))))
                                       .map(jsonMeal => JSON.parse(jsonMeal));
    
                uniqueMeals = uniqueMeals.filter(meal => userDetails.favourites.includes(meal.id));
    
                console.log("Filtered Unique Meals:", uniqueMeals);
    
                setUniqueFavoriteMeals(uniqueMeals);
            } catch (error) {
                console.error('Error fetching favorite meals:', error);
            }
        };
    
        fetchFavoriteMeals();
    }, [userDetails.favourites]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            const response = await axios.put(`${REACT_APP_BASE}/userDetails/updateUser/${formData.user_id}`, formData);
            setMessage('Details updated successfully!');
            setTimeout(() => setMessage(''), 3000);
            const updatedUserSession = { ...userSession, email: formData.email };
            sessionStorage.setItem('userSession', JSON.stringify(updatedUserSession));
            dispatch(setUserDetails(formData));
        } catch (error) {
            setIsError(true);
            setMessage('Error updating details: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setMessage(''), 3000);
        }
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleBookSlot = async () => {
        const selectedTimeSlot = document.getElementById('timeSlot').value;

        if (selectedTimeSlot === "") {
            alert('Please select a valid time slot.');
            return;
        }
        try {
            const updatedActivity = {
                gym_hours: userActivity.gym_hours + 1,
                gym_sessions: userActivity.gym_sessions + 1
            };
            const response = await axios.put(`${REACT_APP_BASE}/userActivity/${userDetails.user_id}`, updatedActivity);
            dispatch(setUserActivity(response.data));
            setBookingSuccessMessage('Slot booked successfully!');

            setTimeout(() => setBookingSuccessMessage(''), 3000);
        } catch (error) {
            setBookingSuccessMessage('Error updating details: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setBookingSuccessMessage(''), 3000);
        }
    };
    const [currentWeight, setCurrentWeight] = useState(userActivity.current_weight || '');
    const [targetWeight, setTargetWeight] = useState(userActivity.target_weight || '');
    const [testimonial, setTestimonial] = useState(userDetails.testimonial || '');
    const fetchTrainer = async () => {
        try {
            const response = await axios.get(`${REACT_APP_BASE}/trainerdetails/trainerForUser/${userDetails.user_id}`);
            setTrainer(response.data);
        } catch (error) {
            setTrainer(null);
        }
    };
    const [trainer, setTrainer] = useState({});
    useEffect(() => {
        setCurrentWeight(userActivity.current_weight || '');
        setTargetWeight(userActivity.target_weight || '');
        setTestimonial(userDetails.testimonial || '');

        fetchTrainer();
        axios.get(`${REACT_APP_BASE}/trainerdetails/allTrainers`)
            .then(response => {
                setTrainers(response.data);
            })
            .catch(error => {
                console.error('Error fetching trainers:', error);
            });
    }, [userActivity, userDetails]);
    const handleUpdateWeights = async () => {
        if (currentWeight === "" || targetWeight === "") {
            alert('Please enter valid weights.');
            return;
        }
        try {
            const updatedWeights = {
                current_weight: parseInt(currentWeight),
                target_weight: parseInt(targetWeight)
            };
            const response = await axios.put(`${REACT_APP_BASE}/userActivity/updateWeight/${userDetails.user_id}`, updatedWeights);
            setWeightSuccessMessage('Weight details updated successfully!');
            setTimeout(() => setWeightSuccessMessage(''), 3000);
            dispatch(setUserActivity({ ...userActivity, current_weight: updatedWeights.current_weight, target_weight: updatedWeights.target_weight }));
        } catch (error) {
            setWeightSuccessMessage('Error updating details: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setWeightSuccessMessage(''), 3000);
        }
    };
    const handleUpdateTestimonial = async () => {
        const testimonialUpdate = {
            testimonial: testimonial
        };
        try {
            const response = await axios.put(`${REACT_APP_BASE}/userDetails/updateUserTestimonial/${formData.user_id}`, testimonialUpdate);
            setTestimonialSuccessMessage('Testimonial updated successfully!');
            setTimeout(() => setTestimonialSuccessMessage(''), 3000);
            dispatch(setUserDetails({ ...userDetails, testimonial: testimonialUpdate.testimonial }));
        } catch (error) {
            setTestimonialSuccessMessage('Error updating details: ' + (error.response?.data?.message || error.message));
            setTimeout(() => setTestimonialSuccessMessage(''), 3000);
        }
    };
    const filteredUserDetails = allUserDetails.filter(member =>
        `${member.firstname} ${member.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [isSelectionMade, setIsSelectionMade] = useState(false);
    function handleTrainerSelection(e) {
        setSelectedTrainer(e.target.value);
    }
    function submitTrainerSelection() {
        try {
            axios.post(`${REACT_APP_BASE}/userActivity/assignTrainer`, { userId: userDetails.user_id, trainerId: selectedTrainer });
            window.location.reload();
        }
        catch (error) {
            console.error('Error updating trainer selection:', error);
        };
    }
    const avatarUrl = `https://ui-avatars.com/api/?name=${userDetails.firstname.charAt(0)}&background=random&color=fff&size=150`;
    return (
        <div>
            <div className="row">
                <div className='col-md-4 mb-4 welcomemsg'>
                    <h2>Welcome, <span id="usernameDisplay">{userDetails.firstname}</span></h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4 userdetails">
                    <h3>User Details</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">User Id</label>
                            <input type="text" className="form-control" id="user_id" placeholder="User Id" value={formData.user_id} onChange={handleInputChange} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dob"
                                value={formatDate(formData.dob)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" className="form-control" id="age" value={formData.age} placeholder="Age" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-control" id="gender" value={formData.gender || ''} onChange={handleInputChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="weight" className="form-label">Weight</label>
                            <input type="number" className="form-control" id="weight" placeholder="Weight in kg" value={formData.weight} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="height" className="form-label">Height</label>
                            <input type="number" className="form-control" id="height" placeholder="Height in cm" value={formData.height} onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Changes</button>
                    </form>
                    <br />
                    <div>
                        {message && (
                            <div className={isError ? 'alert alert-danger' : 'alert alert-success'}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <h3>Gym Training Slot</h3>
                    <p>Book your training slot for the day.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <select id="timeSlot" className="form-control" style={{ width: 'auto' }}>
                            <option value="">Select Time Slot</option>
                            <option value="9:00 AM">9:00 AM - 10:00 AM</option>
                            <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                            <option value="12:00 PM">12:00 PM - 1:00 PM</option>
                            <option value="1:00 PM">1:00 PM - 2:00 PM</option>
                            <option value="2:00 PM">2:00 PM - 3:00 PM</option>
                            <option value="3:00 PM">3:00 PM - 4:00 PM</option>
                            <option value="4:00 PM">4:00 PM - 5:00 PM</option>
                            <option value="5:00 PM">5:00 PM - 6:00 PM</option>
                            <option value="6:00 PM">6:00 PM - 7:00 PM</option>
                            <option value="7:00 PM">7:00 PM - 8:00 PM</option>
                            <option value="8:00 PM">8:00 PM - 9:00 PM</option>
                        </select>
                        <button id="bookSlot" className="btn btn-success" onClick={handleBookSlot}>Book Slot</button>
                    </div>
                    {bookingSuccessMessage && <div className="alert alert-success mt-2">{bookingSuccessMessage}</div>}
                    <div id="bookingStatus"></div>

                    <h3 className="mt-4">Weekly Weight Update</h3>
                    <input
                        type="number"
                        id="weeklyWeight"
                        className="form-control mb-2"
                        placeholder="Enter your current weight"
                        value={currentWeight}
                        onChange={e => setCurrentWeight(e.target.value)}
                    />
                    <input
                        type="number"
                        id="targetWeight"
                        className="form-control mb-2"
                        placeholder="Enter the target weight"
                        value={targetWeight}
                        onChange={e => setTargetWeight(e.target.value)}
                    />
                    <button id="updateWeight" className="btn btn-info" onClick={handleUpdateWeights}>Update Weights</button>
                    {weightSuccessMessage && <div className="alert alert-success mt-2">{weightSuccessMessage}</div>}
                    <h3 className="mt-4">Enter Your Testimonial</h3>
                    <textarea
                        id="testimonialText"
                        className="form-control mb-2"
                        value={testimonial}
                        onChange={e => setTestimonial(e.target.value)}
                    ></textarea>
                    <button id="submitTestimonial" className="btn btn-info" onClick={handleUpdateTestimonial}>Update Testimonial</button>
                    {testimonialSuccessMessage && <div className="alert alert-success mt-2">{testimonialSuccessMessage}</div>}
                </div>

                <div className="col-md-3">
                    <div className="col-lg-4">
                        <img src={avatarUrl} className="img-fluid rounded mb-4" alt="Profile Photo" style={{ maxWidth: '150px' }} />
                    </div>
                    {userDetails.membershipType !== "Gold" && trainer ? (
                        <><h3>Trainer</h3><ul className="list-group" id="memberList">
                            <Link className='no-text-decoration hover-popup' to={`/profile/${trainer.trainerId}`}>
                                <li className="list-group-item">{trainer.trainerName}</li>
                            </Link>
                        </ul><br /></>
                    ) : (
                        <>
                            {userDetails.membershipType !== "Gold" && (<>
                                <select className='form-control' onChange={handleTrainerSelection} value={selectedTrainer} disabled={isSelectionMade}>
                                    <option value="">Select a Trainer</option>
                                    {trainers.map(trainer => (
                                        <option key={trainer.user_id} value={trainer.user_id}>
                                            {trainer.userDetails.firstname} {trainer.userDetails.lastname}
                                        </option>
                                    ))}
                                </select>
                                <br />
                                <button onClick={submitTrainerSelection} className='btn btn-primary'>Confirm Selection</button>
                                <br /><br />
                            </>
                            )}
                        </>

                    )}
                    <h3>Members</h3>
                    <input className="form-control mb-3" type="search" placeholder="Search member" aria-label="Search" id="memberSearch" onChange={handleSearchChange}
                        value={searchTerm} />
                    <ul className="list-group" id="memberList">
                        {filteredUserDetails
                            .filter(member => member.userType == 'Member')
                            .map((member, index) => (
                                <Link className='no-text-decoration hover-popup' to={`/profile/${member.user_id}`}>
                                    <li className="list-group-item">{member.firstname + " " + member.lastname}</li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='row' style={{ marginLeft: 10 }}>
                <h3>Favourite Meals</h3>
            </div>
            <br/>
            <div className='row' style={{ marginLeft: 10 }}>
                <div className='meals-container'>
                    {uniqueFavoriteMeals.length > 0 ? (
                        uniqueFavoriteMeals.map(meal => (
                            <div key={meal.id} className='meal-card'>
                                <img src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`} alt={meal.title} />
                                <h3>{meal.title}</h3>
                                <p>Ready in: {meal.readyInMinutes} minutes</p>
                                <p>Servings: {meal.servings}</p>
                                <a href={meal.sourceUrl} target='_blank' rel='noopener noreferrer'>Recipe</a>
                            </div>
                        ))
                    ) : (
                        <p>No favorite meals to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
