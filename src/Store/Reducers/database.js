import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { username: 'anonymous', name: 'Anonymous' },
    { username: 'vandhana.ram', name: 'Vandhana Ram' },
    { username: 'anjali.vanga', name: 'Anjali Vanga' },
    { username: 'shristhi.singh', name: 'Shrishti Singh' },
  ],
};

const database = createSlice({
  name: 'database',
  initialState: initialState,

  reducers: {},
});

export default database;
