
import { combineReducers } from 'redux';
import { loginReducer } from './login_reducer';
import { registerReducer } from './register_reducer';

// Root Reducer
const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer
});

export default rootReducer;
