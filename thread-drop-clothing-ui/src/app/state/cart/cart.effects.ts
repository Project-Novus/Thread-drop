import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ShopifyService } from '../../core/services/shopify.service';
import * as CartActions from './cart.action';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private shopifyService: ShopifyService) {}

  createCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      mergeMap((action) =>
        this.shopifyService.createCart(action.item,action.buyerIdentity).pipe(
          map((response) => CartActions.loadCartSuccess({ cart: response.data.cartCreate.cart })),
          catchError((error) => of(CartActions.loadCartFailure({ error })))
        )
      )
    )
  );
}
