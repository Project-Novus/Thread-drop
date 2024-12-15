import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.action';

export interface CartState {
  items: any[];
  totalCost: number;
  checkoutUrl: string | null;
}

const initialState: CartState = {
  items: [],
  totalCost: 0,
  checkoutUrl: null,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(CartActions.removeFromCart, (state, { variantId }) => ({
    ...state,
    items: state.items.filter((item) => item.variantId !== variantId),
  })),
  on(CartActions.clearCart, (state) => ({
    ...state,
    items: [],
    totalCost: 0,
    checkoutUrl: null,
  })),
  on(CartActions.setCheckoutUrl, (state, { checkoutUrl }) => ({
    ...state,
    checkoutUrl,
  })),
  on(CartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    items: cart.lines.edges.map((edge:any) => edge.node),
    totalCost: cart.cost.totalAmount.amount,
    checkoutUrl: cart.checkoutUrl,
  }))
);
