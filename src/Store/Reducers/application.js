import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    username: 'anonymous',
    name: 'Anonymous',
    totalPosts: 10,
    totalLikes: 176,
    lastPostedTimestamp: 1679737697241,
    dailyStreaks: 10,
  },
};

const database = createSlice({
  name: 'application',
  initialState: initialState,

  reducers: {
    changeUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export default database;
