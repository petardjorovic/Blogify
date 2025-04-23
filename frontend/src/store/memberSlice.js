import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        memberInfo: {},
    },
    reducers: {
        setMemberInfo: (state, action) => {
            state.memberInfo = action.payload;
        },
    },
});

export const { setMemberInfo } = memberSlice.actions;
export default memberSlice.reducer;
