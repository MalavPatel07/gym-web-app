import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './nutrition.css';
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useSelector } from 'react-redux';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

function Nutrition() {
    const userDetails = useSelector((state) => state.user.userDetails);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [mealPlan, setMealPlan] = useState(null);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    console.log(isLoggedIn);
    console.log(userDetails.membershipType);

    useEffect(() => {
        if (!isLoggedIn || userDetails.membershipType !== 'Platinum') {
            navigate('/');
            return;
        }

        const getMealPlan = async () => {
            try {
                const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
                    params: {
                        apiKey: '022faf3719b04586a2ea7ee1ae9121a1'
                    }
                });
                setMealPlan(response.data.week);
            } catch (error) {
                console.error('Error fetching meal plan:', error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BASE}/userDetails/favourites/${userDetails.user_id}`);
                setFavorites(response.data.favorites || []);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        getMealPlan();
        fetchFavorites();
    }, [isLoggedIn, userDetails, navigate]);

    const addToFavorites = async (mealId) => {
        try {
            const response = await axios.post(`${REACT_APP_BASE}/userDetails/add-to-favorites`, {
                user_id: userDetails.user_id,
                mealId: mealId,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.data.success) {
                setFavorites(prevFavorites => {
                    if (prevFavorites.includes(mealId)) {
                        return prevFavorites.filter(id => id !== mealId);
                    } else {
                        return [...prevFavorites, mealId];
                    }
                });
            } else {
                console.error('Error adding/removing meal to/from favorites:', response.data.error);
            }
        } catch (error) {
            console.error(`Error adding/removing meal ${mealId} to/from favorites:`, error);
        }
    };

    const isFavorite = (mealId) => {
        return favorites.includes(mealId);
    };

    const handleFavoriteToggle = async (mealId) => {
        await addToFavorites(mealId);
    };

    const getButtonText = (mealId) => {
        return isFavorite(mealId) ? 'Remove from Favorites' : 'Add to Favorites';
    };

    if (!mealPlan) {
        return <div>Loading meal plan...</div>;
    }

    return (
        <div className="nutrition-container">
            <h1>Meal Plan for {userDetails.firstname} {userDetails.lastname}</h1>
            {Object.entries(mealPlan).map(([day, data]) => (
                <div key={day} className="day-container">
                    <h2 className='text-black'>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
                    <div className="meals-container">
                        {data.meals.map(meal => (
                            <div key={meal.id} className="meal-card">
                                <img src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`} alt={meal.title} />
                                <h3>{meal.title}</h3>
                                <p>Ready in: {meal.readyInMinutes} minutes</p>
                                <p>Servings: {meal.servings}</p>
                                <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">Recipe</a>
                                {
                                    favorites.includes(meal.id) ? (
                                        <FaHeart
                                            onClick={() => handleFavoriteToggle(meal.id)}
                                            style={{color: 'red', fontSize: '24px', marginLeft: '10px'}}
                                        />
                                    ) : (
                                        <FaRegHeart
                                            onClick={() => handleFavoriteToggle(meal.id)}
                                            style={{color: 'red', fontSize: '24px', marginLeft: '10px'}}
                                        />
                                    )
                                }
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
