import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import userReducers from './userReducers';


const rootReducer = combineReducers({
    user: userReducers,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))