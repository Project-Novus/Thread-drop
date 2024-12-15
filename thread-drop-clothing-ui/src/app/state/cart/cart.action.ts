import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: any, buyerIdentity?:any }>() // `item` includes `variantId` and `quantity`.
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ variantId: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const setCheckoutUrl = createAction(
  '[Cart] Set Checkout URL',
  props<{ checkoutUrl: string }>()
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: any }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);
