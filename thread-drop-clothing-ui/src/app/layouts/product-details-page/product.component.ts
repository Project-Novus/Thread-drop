import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/core/models/productModel';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { SelectedSize } from 'src/app/shared/models/sizeModel';
import { AppState } from 'src/app/state/app.state';
import * as ProductActions from '../../state/product/product.actions'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

  sourcePage: string | null | any = null;
 
  constructor(private route: ActivatedRoute,
              public productStateService: ProductStateService,
             )
               {
                
                }

  ngOnInit(): void {
   
    this.sourcePage = this.route.snapshot.queryParamMap.get('from')
    
   
    
  }
 


}
