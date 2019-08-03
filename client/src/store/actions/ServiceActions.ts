import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'
import { Service } from '../types';
import { IServiceState } from '../reducers/serviceReducer';


export enum ServiceActionTypes {
  GET_ALL_SERVICES  = 'GET_ALL_SERVICES'
}

export interface IGetAllServicesAction {
  type: ServiceActionTypes.GET_ALL_SERVICES;
  payload: Service[]
}

export type ServiceActions = IGetAllServicesAction;


export const getServices: ActionCreator<ThunkAction<Promise<any>, IServiceState, null, IGetAllServicesAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/services",
        {withCredentials: true}
      )
      dispatch({
        type: ServiceActionTypes.GET_ALL_SERVICES,
        payload: response.data
      })
    } catch (err) {
      console.error(err)
    }
  }
}