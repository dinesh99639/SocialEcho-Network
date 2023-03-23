import { combineReducers } from '@reduxjs/toolkit';

import database from './Reducers/database';
import application from './Reducers/application';

export default combineReducers({
  database: database.reducer,
  application: application.reducer,
});
