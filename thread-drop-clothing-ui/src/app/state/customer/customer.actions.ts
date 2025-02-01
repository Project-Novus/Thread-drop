import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{ email: string; password: string }>()
);
export const alreadyLoggedIn = createAction(
  '[User] Logged In',
  props<{customerAccessToken:any}>()
)
export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ customerAccessToken: any }>()
);
export const loadCustomerProfile = createAction(
  '[User] Load Customer Profile',
  props<{ customer: any }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: any }>()
);

export const loadProfile = createAction('[User] Load Profile',
    props<{customerAccessToken:any}>()
);

export const loadOrders = createAction('[User] Load Orders',
    props<{orders:any}>()
);
export const loadOrdersSuccess = createAction('[User] Load Orders Success',
    props<{orders:any}>()
);
export const loadOrdersFailure = createAction('[User] Load Orders Success',
    props<{error:any}>()
);
