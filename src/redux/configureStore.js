import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer ,routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from './DevTools';

const routerMiddle = routerMiddleware(hashHistory);

const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware,routerMiddle),
  DevTools.instrument()
)(createStore);

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer,
});

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  return store;
}