import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { ShopifyService } from 'src/app/core/services/shopify.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  @Input() option:string=''
  constructor(private router: Router,
    private shopifyService:ShopifyService,
    public productStateService:ProductStateService) {
  this.productStateService.products$.pipe(
  tap((res) => {console.log(res,"Product state");

  })
)
.subscribe()

}

  ngOnInit(): void {
    this.productStateService.loadProducts(this.option);
    this.productStateService.selectedProduct$
  }
  onProductClick(prodId: string): void {
    this.router.navigate([`${this.option}/${prodId}`], { queryParams: { from: `${this.option}` } })
  }
}
