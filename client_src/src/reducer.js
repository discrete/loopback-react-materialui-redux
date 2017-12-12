import { combineReducers } from 'redux';

import objectivesReducer from './redux/modules/objectives';

export default combineReducers({
  objectives: objectivesReducer
});
