import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ShopifyService } from '../../core/services/shopify.service';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private shopifyService: ShopifyService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.login),
      mergeMap(({ email, password }) =>
        this.shopifyService.customerLogin(email, password).pipe(
          map((response) => {
            const customer = response.data.customerAccessTokenCreate.customer;
            return CustomerActions.loginSuccess({ customer });
          }),
          catchError((error) => of(CustomerActions.loginFailure({ error })))
        )
      )
    )
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadProfile),
      mergeMap(({customerAccessToken}) =>
        this.shopifyService.getCustomerData(customerAccessToken).pipe(
          map((profile) => CustomerActions.loginSuccess({ customer: profile })),
          catchError((error) => of(CustomerActions.loginFailure({ error })))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadOrders),
      mergeMap(({orders}) =>
        this.shopifyService.getCustomerOrders(orders).pipe(
          map((orders) => CustomerActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(CustomerActions.loadOrdersFailure({ error })))
        )
      )
    )
  );
}
