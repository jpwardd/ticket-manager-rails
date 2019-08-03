
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk, { ThunkMiddleware } from 'redux-thunk';
// Import reducers and state type
import {
  authReducer,
  IAuthState,
} from '../reducers/authReducer';
import { serviceReducer, IServiceState } from './reducers/serviceReducer';

const initialState = {}
// Create an interface for the application state
export interface IAppState {
  authState: IAuthState;
  services: IServiceState
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  authState: authReducer,
  services: serviceReducer
});

// Create a configure store function of type `IAppState`
export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState>)))
