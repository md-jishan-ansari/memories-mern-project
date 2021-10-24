import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import { postsReducer } from './reducers/postReducers';
import { userReducer } from './reducers/userReducers';

const reducers = combineReducers({
    posts: postsReducer,
    user: userReducer
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;