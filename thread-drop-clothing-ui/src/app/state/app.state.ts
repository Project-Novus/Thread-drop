import { CartState } from './cart/cart.reducer';
import { CustomerState } from './customer/customer.reducer';
import { ProductState } from './product/product.reducer';

export interface AppState {
  cart: CartState;
  customer: CustomerState;
  products: ProductState;
}
