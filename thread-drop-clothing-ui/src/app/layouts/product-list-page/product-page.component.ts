import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { ShopifyService } from 'src/app/core/services/shopify.service';
import { AppState } from 'src/app/state/app.state';
import * as ProductSelector from '../../state/product/product.selectors' 
import * as ProductActions from '../../state/product/product.actions' 

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  @Input() option:string=''
  products$!:Observable<any>
  constructor(private router: Router,
    private shopifyService:ShopifyService,
    public productStateService:ProductStateService,
    private store: Store<AppState>) {
      
      this.store.dispatch(ProductActions.clearProductDetails());

}

  ngOnInit(): void {
    
    if(this.option === "signature"){

      this.products$ = this.store.select(ProductSelector.selectSignatureProducts)
    }else{
      this.products$ = this.store.select(ProductSelector.selectLuxuryProducts)

    }
    
    console.log("Product Page Component");
    
  }
  onProductClick(productId: string): void {
    this.store.dispatch(ProductActions.loadProductDetails({productId}))
    this.router.navigate([`${this.option}/${productId}`], { queryParams: { from: `${this.option}` } })
  }
}
