import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        loader: false,
    },
    reducers: {
        showLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
