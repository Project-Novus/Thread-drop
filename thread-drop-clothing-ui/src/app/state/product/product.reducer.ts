import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export interface ProductState {
  products: any[];
  selectedProduct: any | null;
  signatureProducts: any[];
  luxuryProducts: any[];
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  signatureProducts:[],
  luxuryProducts:[]
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(ProductActions.loadSignatureProducts, (state, { signatureProducts }) => ({
    ...state,
    signatureProducts,
  })),
  on(ProductActions.loadLuxuryProducts, (state, { luxuryProducts }) => ({
    ...state,
    luxuryProducts,
  })),
  on(ProductActions.loadProductDetailsSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product
  })),
  on(ProductActions.clearProductDetails, (state) => ({
    ...state,
    selectedProduct: null
  })),

);
