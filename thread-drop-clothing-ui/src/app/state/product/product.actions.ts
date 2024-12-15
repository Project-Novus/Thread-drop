import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: any[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const loadProductDetails = createAction(
  '[Product Page] Load Product Details',
  props<{ productId: string }>()
);
export const clearProductDetails = createAction(
  '[Product] clear Product Details'
);
export const loadProductDetailsSuccess = createAction(
  '[Product Page] Load Product Details Success',
  props<{ product: any }>()
);
export const loadProductDetailsFailure = createAction(
  '[Product Page] Load Product Details Failure',
  props<{ error: string }>()
);
export const loadSignatureProducts = createAction(
  '[Signature] Load Signature Products',
  props<{signatureProducts:[]}>()
)
export const loadLuxuryProducts = createAction(
  '[Luxury] Load Luxury Products',
  props<{luxuryProducts:[]}>()
)