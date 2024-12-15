import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Customer] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Customer] Login Success',
  props<{ customer: any }>()
);

export const loginFailure = createAction(
  '[Customer] Login Failure',
  props<{ error: any }>()
);

export const loadProfile = createAction('[Customer] Load Profile',
    props<{customerAccessToken:string}>()
);

export const loadOrders = createAction('[Customer] Load Orders',
    props<{orders:any}>()
);
export const loadOrdersSuccess = createAction('[Customer] Load Orders Success',
    props<{orders:any}>()
);
export const loadOrdersFailure = createAction('[Customer] Load Orders Success',
    props<{error:any}>()
);
