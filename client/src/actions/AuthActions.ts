import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IAuthState, User } from '../reducers/authReducer';

// Create Action Constants
export enum AuthActionTypes {
  GET_ALL = 'GET_ALL',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
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
/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type AuthActions = IAuthLoginAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
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
      dispatch({
        type: AuthActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};


  