import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import loaderSlice from './loaderSlice';
import memberSlice from './memberSlice';

const store = configureStore({
    reducer: {
        userStore: userSlice,
        loaderStore: loaderSlice,
        memberStore: memberSlice,
    },
});

export default store;
