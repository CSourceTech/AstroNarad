import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dateOfBirth: null,
    birthTime: null,
};

const dobSlice = createSlice({
    name: 'dob',
    initialState,
    reducers: {
        setDateOfBirth: (state, action) => {
            state.dateOfBirth = action.payload;
        },
        setBirthTime: (state, action) => {
            state.birthTime = action.payload;
        },
    },
});

export const { setDateOfBirth, setBirthTime } = dobSlice.actions;

export default dobSlice.reducer;
