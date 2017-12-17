import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';

import objectivesReducer from './redux/modules/objectives';

export default combineReducers({
  locale: localeReducer,
  objectives: objectivesReducer
});
