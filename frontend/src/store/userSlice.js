import { createSlice } from '@reduxjs/toolkit';
import { localStorageConfig } from '../config/localStorageConfig';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // localStorage.setItem(localStorageConfig.USER, JSON.stringify(action.payload));
        },
        restoreUser: (state) => {
            const resUser = JSON.parse(localStorage.getItem(localStorageConfig.USER));
            state.user = resUser;
        },
        logout: (state) => {
            localStorage.removeItem(localStorageConfig.TOKEN);
            state.user = null;
            // localStorage.removeItem(localStorageConfig.USER);
        },
    },
});

export const { setUser, restoreUser, logout } = userSlice.actions;
export default userSlice.reducer;
