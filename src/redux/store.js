import rootReducer from './reducers/index';
import { createStore } from 'redux';

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState);
};

export default configureStore;