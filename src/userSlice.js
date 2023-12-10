import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: JSON.parse(sessionStorage.getItem('userDetails')) || {},
    allUserDetails: [],
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
    userCount: 0,
    userActivity: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
            sessionStorage.setItem('userDetails', JSON.stringify(action.payload));
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
            sessionStorage.setItem('isLoggedIn', action.payload);
        },
        setAllUserDetails: (state, action) => {
            state.allUserDetails = action.payload
        },
        setUserCount: (state, action) => {
            state.userCount = action.payload
        },
        setUserActivity: (state, action) => {
            state.userActivity = action.payload
        }
    },
});

export const { setUserDetails, setIsLoggedIn, setAllUserDetails, setUserCount, setUserActivity } = userSlice.actions;

export default userSlice.reducer;
