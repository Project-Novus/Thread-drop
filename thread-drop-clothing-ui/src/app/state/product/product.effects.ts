import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ShopifyService } from '../../core/services/shopify.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private shopifyService: ShopifyService) {
    console.log('CartEffects initialized');
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.shopifyService.getProducts().pipe(
          map((response) => {
            const products = response.data.products.edges.map((edge:any) => edge.node);
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((error) => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  loadProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductDetails),
      mergeMap(({ productId }) =>
        this.shopifyService.getProductByHandle(productId).pipe(
          map((response) => {
            
            const product = response.data
            return ProductActions.loadProductDetailsSuccess({ product });
          }),
          catchError((error) => of(ProductActions.loadProductDetailsFailure({ error })))
        )
      )
    )
  );
}
