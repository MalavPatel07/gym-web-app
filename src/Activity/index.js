import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Exercise() {
    const [exercises, setExercises] = useState(null);
    const [selectedType, setSelectedType] = useState('cardio');
    const [expandedExercise, setExpandedExercise] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?type=${selectedType}`, {
                    headers: {
                        'X-Api-Key': 'RdDKS0fqotlCWVMazVtUNQ==ZXI7HTwuLffMDo6x',
                    },
                });
                console.log(response);
                setExercises(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();
    }, [selectedType]);

    if (!exercises) {
        return <div>Loading exercises...</div>;
    }

    const types = [
        'cardio',
        'olympic_weightlifting',
        'plyometrics',
        'powerlifting',
        'strength',
        'stretching',
        'strongman',
    ];

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleCardClick = (exercise) => {
        setExpandedExercise((prevExpandedExercise) => {
            return prevExpandedExercise === exercise ? null : exercise;
        });
    };

    const renderExerciseCards = () => {
        return exercises
            .filter((exercise) => exercise.type === selectedType)
            .map((exercise) => (
                <div key={exercise.name} className="col-md-4 mb-4">
                    <div className="card member-card" onClick={() => handleCardClick(exercise)}>
                        <div className="card-body">
                            <h5 className="card-title">{exercise.name}</h5>
                            <p className="card-text">Type: {exercise.type}</p>
                            <p className="card-text">Muscle: {exercise.muscle}</p>
                            <p className="card-text">Equipment: {exercise.equipment}</p>
                            <p className="card-text">Difficulty: {exercise.difficulty}</p>
                            {expandedExercise === exercise ? (
                                <p className="card-text">{exercise.instructions}</p>
                            ) : (
                                <p className="card-text">{exercise.instructions.slice(0, 100)}...</p>
                            )}
                        </div>
                    </div>
                </div>
            ));
    };

    return (
        <div className="d-flex flex-column align-items-center activity">
            <div className="container mt-4">
                <h1 className="text-center"></h1>
                <div className="form-group">
                    <label htmlFor="exerciseType">Select Exercise Type:</label>
                    <select className="form-control" id="exerciseType" value={selectedType} onChange={handleTypeChange}>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <h2 className="col-12 text-center"></h2>
                    {renderExerciseCards()}
                </div>
            </div>
        </div>
    );
}

export default Exercise;
