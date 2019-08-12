import { Service } from './../types';
import { Reducer } from 'redux'
import { ServiceActions, ServiceActionTypes } from '../actions/ServiceActions'


export interface IServiceState {
  loading: boolean
  services: Service[]
  service: {} | Service


}

const initialServiceState: IServiceState = {
  services: [],
  loading: false,
  service: {}
}

export const serviceReducer: Reducer<IServiceState, ServiceActions> = (state = initialServiceState, action) => {
    const { type, payload} = action;
    switch (type) {
    case ServiceActionTypes.GET_ALL_SERVICES: {
      return {
        ...state,
        loading: false,
        services: payload,
      };
    }
    case ServiceActionTypes.EDIT_SERVICE_SUCCESS: {
      return {
        ...state,
        loading: false,
        service: payload
      }
    }
    default:
      return state;
  }
}

