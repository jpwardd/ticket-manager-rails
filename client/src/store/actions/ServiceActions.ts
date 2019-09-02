import { Payload, loadUser } from './AuthActions';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'
import { Service } from '../types';
import { IServiceState } from '../reducers/serviceReducer';


export enum ServiceActionTypes {
  GET_ALL_SERVICES  = 'GET_ALL_SERVICES',
  EDIT_SERVICE_SUCCESS = 'EDIT_SERVICE_SUCCESS',
  CREATE_SERVICE = 'CREATE_SERVICE'
}

export interface IGetAllServicesAction {
  type: ServiceActionTypes.GET_ALL_SERVICES;
  payload: Service[]
}

export interface IEditServiceAction {
  type: ServiceActionTypes.EDIT_SERVICE_SUCCESS;
  Payload: Service
}

export interface ICreateServiceAciton {
  type: ServiceActionTypes.CREATE_SERVICE;
  Payload: Service
}

export type ServiceActions = IGetAllServicesAction & IEditServiceAction & ICreateServiceAciton;


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


export const editService: ActionCreator<ThunkAction<Promise<any>, IServiceState, null, IEditServiceAction>
> = (id, name, price, category) => {
  return async (dispatch: Dispatch) => {
    try {
      
      const response = await axios.patch(`http://localhost:3001/api/v1/services/${id}`,
      {
        name: name,
        price: price,
        category: category
      
      },
      {withCredentials: true }
      )
      
      dispatch({
       type: ServiceActionTypes.EDIT_SERVICE_SUCCESS,
       payload: response.data
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const createService: ActionCreator<ThunkAction<Promise<any>, IServiceState, null, ICreateServiceAciton>
> = (name, price, category) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/services`,
        {
          name: name,
          price: price,
          category: category
        },
        { withCredentials: true }
      )

      dispatch({
        type: ServiceActionTypes.CREATE_SERVICE,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

