import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopifyService } from './shopify.service';
@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private cartSubject = new BehaviorSubject<any>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private shopifyService: ShopifyService) {}

  createCart(variantId: string, quantity: number,buyerIdentity:any): void {
    // this.shopifyService.createCheckout([{ variantId, quantity }])
    this.shopifyService.createCart([{ variantId, quantity }],buyerIdentity)
      .pipe(tap(cart => this.cartSubject.next(cart)))
      .subscribe();
  }

  addItemToCart(checkoutId: string, variantId: string, quantity: number): void {
    this.shopifyService.addLineItemsToCheckout(checkoutId, [{ variantId, quantity }])
      .pipe(tap(cart => this.cartSubject.next(cart)))
      .subscribe();
  }

  updateCartItem(checkoutId: string, lineItemId: string, quantity: number): void {
    this.shopifyService.updateLineItemsInCheckout(checkoutId, [{ id: lineItemId, quantity }])
      .pipe(tap(cart => this.cartSubject.next(cart)))
      .subscribe();
  }

  removeCartItem(checkoutId: string, lineItemId: string): void {
    this.shopifyService.removeLineItemsFromCheckout(checkoutId, [lineItemId])
      .pipe(tap(cart => this.cartSubject.next(cart)))
      .subscribe();
  }
}

