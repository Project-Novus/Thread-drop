import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  profile: any;
  customerAccessToken:any
  orders: any[];
  loggedIn: boolean;
  error:any
}

const initialState: CustomerState = {
  profile: null,
  customerAccessToken:null,
  orders: [],
  loggedIn: false,
  error:null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loginSuccess, (state, { customerAccessToken }) => ({
    ...state,
    customerAccessToken: customerAccessToken,
    loggedIn: true,
  })),
  on(CustomerActions.loginFailure, (state,{error}) => ({
    ...state,
    profile: null,
    loggedIn: false,
    error: error
  })),
  on(CustomerActions.loadOrders, (state, { orders }) => ({
    ...state,
    orders,
  })),
  on(CustomerActions.loadCustomerProfile, (state, { customer }) => ({
    ...state,
    profile: customer,
  })),
  on(CustomerActions.alreadyLoggedIn, (state, { customerAccessToken }) => ({
    ...state,
    customerAccessToken: customerAccessToken,
    loggedIn: true,
  }))
);
