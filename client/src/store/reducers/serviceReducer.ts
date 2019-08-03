import { Service } from './../types';
import { Reducer } from 'redux'
import { ServiceActions, ServiceActionTypes } from '../actions/ServiceActions'


export interface IServiceState {
  loading: boolean
  services: Service[]


}

const initialServiceState: IServiceState = {
  services: [],
  loading: false
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
    default:
      return state;
  }
}

