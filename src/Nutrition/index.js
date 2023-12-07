import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './nutrition.css';

function Nutrition({ isLoggedIn, userDetails }) {
    const [mealPlan, setMealPlan] = useState(null);
    const navigate = useNavigate();
    console.log(isLoggedIn);
    console.log(userDetails.membershipType);
    useEffect(() => {
        // Redirect if not logged in or not a Platinum user
        if (!isLoggedIn || userDetails.membershipType !== 'Platinum') {
            navigate('/'); // Redirect to home or login page
            return;
        }

        const getMealPlan = async () => {
            try {
                const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
                    params: {
                        apiKey: 'f3823f9445464ff4bd8c7fb47e0b389c'
                    }
                });
                setMealPlan(response.data.week);
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            }
        };

        getMealPlan();
    }, [isLoggedIn, userDetails, navigate]);

    if (!mealPlan) {
        return <div>Loading meal plan...</div>;
    }

    return (
        <div className="nutrition-container">
            <h1>Meal Plan for {userDetails.firstname} {userDetails.lastname}</h1>
            {Object.entries(mealPlan).map(([day, data]) => (
                <div key={day} className="day-container">
                    <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
                    <div className="meals-container">
                        {data.meals.map(meal => (
                            <div key={meal.id} className="meal-card">
                                <img src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`} alt={meal.title} />
                                <h3>{meal.title}</h3>
                                <p>Ready in: {meal.readyInMinutes} minutes</p>
                                <p>Servings: {meal.servings}</p>
                                <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">Recipe</a>
                            </div>
                        ))}
                    </div>
                    <div className="nutrients-table">
                        <table>
                            <tbody>
                                <tr><th>Calories</th><td>{data.nutrients.calories}</td></tr>
                                <tr><th>Protein</th><td>{data.nutrients.protein}g</td></tr>
                                <tr><th>Fat</th><td>{data.nutrients.fat}g</td></tr>
                                <tr><th>Carbohydrates</th><td>{data.nutrients.carbohydrates}g</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Nutrition;
