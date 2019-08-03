import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import User Typing
import { IAuthState } from '../reducers/authReducer';
import { User } from '../types'

// Create Action Constants
export enum AuthActionTypes {
  GET_ALL = 'GET_ALL',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOAD_USER = 'LOAD_USER',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
}

// Interface for Get All Action Type
export interface IAuthGetAllAction {
  type: AuthActionTypes.GET_ALL;
  users: User[];
}

export interface IAuthLoginAction {
  type: AuthActionTypes.LOGIN_USER_SUCCESS,
  payload: User
}

export interface ILoadUserAction {
  type: AuthActionTypes.LOAD_USER,
  payload: User
}

export interface IRegisterUserAction {
  type: AuthActionTypes.REGISTER_USER_SUCCESS,
  payload: User
}
/* 
Combine the action types with a union (we assume there are more)
example: export type AuthActions = IGetAllAction | IGetOneAction ... 
*/
export type AuthActions = IAuthLoginAction | ILoadUserAction | IRegisterUserAction;

export interface Payload {
  first_name: string
  lastName: string
  email: string
  password: string
}

export const loginUser: ActionCreator<
  ThunkAction<Promise<any>, IAuthState, null, IAuthLoginAction>
> = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/sessions",
      {
        user: {
          email: email,
          password: password
        }
      },
      { withCredentials: true}
      );
      console.log("response from login", response)
      dispatch({
        type: AuthActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const register: ActionCreator<ThunkAction<Promise<any>, IAuthState, null, IRegisterUserAction>
> = (firstName: string, lastName: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {

    try {
      const response = await axios.post('http://localhost:3001/api/v1/registrations',
      {
        
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
          
        }
        
      },
      { withCredentials: true }
      )
      dispatch({
        type: AuthActionTypes.REGISTER_USER_SUCCESS,
        payload: response.data
      })
    } catch (err) {
      
    }
    }
  }
  
  
  export const loadUser: ActionCreator<ThunkAction<Promise<any>, IAuthState, null, ILoadUserAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try { 
      const res = await axios.get('http://localhost:3001/logged_in',
      { withCredentials: true}
      )

      dispatch({
        type: AuthActionTypes.LOAD_USER,
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }
}



  