import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from './cart/cart.reducer';
import { customerReducer } from './customer/customer.reducer';
import { productReducer } from './product/product.reducer';
import { CartEffects } from './cart/cart.effects';
import { CustomerEffects } from './customer/customer.effects';
import { ProductEffects } from './product/product.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({
      cart: cartReducer,
      customer: customerReducer,
      products: productReducer,
    }),
    EffectsModule.forRoot([CartEffects,CustomerEffects,ProductEffects]),
  ],
})
export class AppStateModule {}
