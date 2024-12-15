import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

// Feature Selector
export const selectProductState = createFeatureSelector<ProductState>('products');

// Selectors
export const selectProductList = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectProductDetails = createSelector(
  selectProductState,
  (state) => state.selectedProduct
);
export const selectSignatureProducts = createSelector(
  selectProductState,
selectProductList,
(state,products)=>products.filter(data=>{return data.collections.edges[0].node.handle === "signature"})
    
);
export const selectLuxuryProducts = createSelector(
  selectProductState,
  selectProductList,
  (state,products) => products.filter(data=>{return data.collections.edges[0].node.handle === "luxury"})
);
