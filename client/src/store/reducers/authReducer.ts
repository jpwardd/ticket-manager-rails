import { Reducer } from 'redux'
import { AuthActions, AuthActionTypes } from '../actions/AuthActions'
import { User } from '../types'


export interface IAuthState {
  loading: boolean
  user: {} | User
  users: User[]
  isAuthenticated: boolean
}

const initialAuthState: IAuthState = {
  loading: true,
  user: {},
  users: [],
  isAuthenticated: false
}

export const authReducer: Reducer<IAuthState, AuthActions> = (state = initialAuthState, action) => {
    const { type, payload} = action;
    switch (type) {
    case AuthActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...payload,
      };
    }

    case AuthActionTypes.LOAD_USER: {
      console.log(action)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...payload
      }
    }
    case AuthActionTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        ...payload
      }
    }
    default:
      return state;
  }
}