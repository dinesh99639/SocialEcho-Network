import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: 1679737567241,
    username: 'anonymous',
    name: 'Anonymous',
    totalPosts: 0,
    totalLikes: 0,
    lastPostedTimestamp: 0,
    dailyStreaks: 0,
  },
};

const database = createSlice({
  name: 'application',
  initialState: initialState,

  reducers: {
    reset: () => initialState,

    changeUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export default database;
