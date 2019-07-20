import { Reducer } from 'redux'
import { AuthActions, AuthActionTypes } from '../actions/AuthActions'

export type User = {
  firstName: string
  lastName: string
  email: string
  owner: boolean
  manager: boolean
  receptionist: boolean
}
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
    default:
      return state;
  }
}