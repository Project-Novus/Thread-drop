import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopifyService } from './shopify.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerStateService {
  private customerSubject = new BehaviorSubject<any>(null);
  customer$ = this.customerSubject.asObservable();

  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor(private shopifyService: ShopifyService) {}

  login(email: string, password: string): Observable<any> {
   return this.shopifyService.customerLogin(email, password)
      .pipe(tap(tokenData => {
        const accessTokenObj = tokenData.data.customerAccessTokenCreate.customerAccessToken;
        if(accessTokenObj){
          localStorage.setItem('customerAccessToken', JSON.stringify(accessTokenObj));
          this.loadCustomerProfile();
        }else{
          const errors = tokenData.data.customerAccessTokenCreate.customerUserErrors.length
          // if(errors.length){
          //   errors[0].message = errors[0].message
          // }
        }
      }))
  }

  logout(): void {
    localStorage.removeItem('customerAccessToken');
    this.customerSubject.next(null);
    this.ordersSubject.next([]);
  }

  loadCustomerProfile(): void {
    const accessTokenObj = JSON.parse(localStorage.getItem('customerAccessToken') as string);;
    if (accessTokenObj) {
      this.shopifyService.getCustomerData(accessTokenObj?.accessToken)
        .pipe(tap(customer => this.customerSubject.next(customer)))
        .subscribe();
    }
  }

  loadCustomerOrders(): void {
    const accessTokenObj = JSON.parse(localStorage.getItem('customerAccessToken') as string);;
    if (accessTokenObj) {
      this.shopifyService.getCustomerOrders(accessTokenObj?.accessToken)
        .pipe(tap(orders => this.ordersSubject.next(orders)))
        .subscribe();
    }
  }
}
