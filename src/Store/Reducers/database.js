import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const database = createSlice({
  name: 'database',
  initialState: initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByValue: (state, { payload }) => {
      state.value += payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export default database;
