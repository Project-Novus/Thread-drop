import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotalCost = createSelector(
  selectCartState,
  (state) => state.totalCost
);

export const selectCheckoutUrl = createSelector(
  selectCartState,
  (state) => state.checkoutUrl
);
