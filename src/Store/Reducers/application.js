import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    username: 'anonymous',
    name: 'Anonymous',
  },
};

const database = createSlice({
  name: 'application',
  initialState: initialState,

  reducers: {
    changeUser: (state, { payload }) => {
      state.user.username = payload.username;
      state.user.name = payload.name;
    },
  },
});

export default database;
