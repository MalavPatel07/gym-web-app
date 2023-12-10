import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUserDetails, setUserActivity, setUserCount } from './userSlice.js';
import axios from 'axios';
const REACT_APP_BASE = process.env.REACT_APP_BASE;

const DataLoader = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user.userDetails);
    // console.log(userDetails);
    useEffect(() => {
        const fetchAllUserDetails = async () => {
            try {
                const responseUserDetails = await fetch(`${REACT_APP_BASE}/userDetails/allUsersWithCount`);
                if (!responseUserDetails.ok) {
                    throw new Error(`HTTP error! Status: ${responseUserDetails.status}`);
                }
                const userDetailsData = await responseUserDetails.json();
                const responseUser = await fetch(`${REACT_APP_BASE}/users/get/allUsers`);
                if (!responseUser.ok) {
                    throw new Error(`HTTP error! Status: ${responseUser.status}`);
                }
                const userData = await responseUser.json();
                const combinedData = userDetailsData.allUserDetails.map(detail => {
                    const user = userData.find(user => user.user_id === detail.user_id);
                    return { ...detail, ...user }; 
                });
                const responseActivity = await axios.get(`${REACT_APP_BASE}/userActivity/${userDetails.user_id}`);
                dispatch(setUserActivity(responseActivity.data));
                dispatch(setAllUserDetails(combinedData));
                dispatch(setUserCount(userDetailsData.count));
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchAllUserDetails();
    }, [dispatch]);

    return null;
};

export default DataLoader;
