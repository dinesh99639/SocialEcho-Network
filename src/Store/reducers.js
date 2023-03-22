import { combineReducers } from '@reduxjs/toolkit';

import database from './Reducers/database';

export default combineReducers({
  database: database.reducer,
});
