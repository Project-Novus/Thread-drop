import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopifyService } from './shopify.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  private selectedProductSubject = new BehaviorSubject<any>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  constructor(private shopifyService: ShopifyService) {}

  loadAllProducts():void{
    this.shopifyService.getAllProducts().subscribe(res=>console.log(res))  
  }
  loadProducts(collectionHandle: string): void {
    this.shopifyService.getProductsByCollection(collectionHandle)
      .pipe(tap(products => this.productsSubject.next(products?.data?.collectionByHandle?.products?.edges)))
      .subscribe();
  }

  loadProductById(productId: string): void {
    this.shopifyService.getProductByHandle(productId)
      .pipe(tap(product => this.selectedProductSubject.next(product?.data?.productByHandle)))
      .subscribe();
  }

  clearSelectedProduct():void{
      this.selectedProductSubject.next(null);
  }
}
