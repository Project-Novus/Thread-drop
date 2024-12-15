import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

// Feature Selector
export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

// Selectors
export const selectCustomerProfile = createSelector(
  selectCustomerState,
  (state) => state.profile
);

export const selectCustomerOrders = createSelector(
  selectCustomerState,
  (state) => state.orders
);

export const selectCustomerLoggedIn = createSelector(
  selectCustomerState,
  (state) => state.loggedIn
);
