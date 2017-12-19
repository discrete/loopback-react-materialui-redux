import { combineReducers } from 'redux';
import { localeReducer } from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './redux/modules/auth';
import objectivesReducer from './redux/modules/objectives';

export default combineReducers({
  auth: authReducer,
  locale: localeReducer,
  objectives: objectivesReducer,
  form: formReducer
});
