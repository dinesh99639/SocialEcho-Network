import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      username: 'anonymous',
      name: 'Anonymous',
      totalPosts: 10,
      totalLikes: 176,
      lastPostedTimestamp: 1679737697241,
      dailyStreaks: 10,
    },
    {
      username: 'vandhana.ram',
      name: 'Vandhana Ram',
      totalPosts: 12,
      totalLikes: 506,
      lastPostedTimestamp: 1679737697241,
      dailyStreaks: 10,
    },
    {
      username: 'anjali.vanga',
      name: 'Anjali Vanga',
      totalPosts: 25,
      totalLikes: 912,
      lastPostedTimestamp: 1679737697241,
      dailyStreaks: 6,
    },
    {
      username: 'shristhi.singh',
      name: 'Shrishti Singh',
      totalPosts: 8,
      totalLikes: 485,
      lastPostedTimestamp: 1679737697241,
      dailyStreaks: 8,
    },
  ],
};

const database = createSlice({
  name: 'database',
  initialState: initialState,

  reducers: {
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
  },
});

export default database;
