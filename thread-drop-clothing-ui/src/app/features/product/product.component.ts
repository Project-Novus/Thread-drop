import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { SelectedSize } from 'src/app/shared/models/sizeModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  productId: string= '';
  sourcePage: string | null | any = null;
  tabOne:boolean = true;
  tabTwo:boolean = false;
  tabThree:boolean = false;
  sizes:string[] = ["S","M","L","XL","XXL"];
  isSelected:boolean = false;
  selectedData:SelectedSize = {
    size:'',
    isSelected:false
  };
  productData:any
  selectedProduct: Product | null | any = null;
  constructor(private route: ActivatedRoute,
              public productStateService: ProductStateService)
               {
                this.productStateService.selectedProduct$
                .subscribe(
                  data => {this.selectedProduct = data,console.log(data);
                  });
                }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.sourcePage = this.route.snapshot.queryParamMap.get('from')
    // if(this.sourcePage==='luxury'){
    //   this.productData = this.luxuryProductData.filter(id=>id.productId===this.productId)[0]
    // }else{
    //   this.productData = this.signatureProductData.filter(id=>id.productId===this.productId)[0]
    // }
    this.productStateService.loadProductById(this.productId)
    
  }
  detailSectionClick(tab:number){
    if(tab===1){
      this.tabOne = true;
      this.tabTwo = this.tabThree = false;
    }else if(tab===2){
      this.tabTwo = true;
      this.tabOne = this.tabThree = false;
    }else{
      this.tabThree = true;
      this.tabOne = this.tabTwo = false;
    }
  }
  sizeClicked(e:any){
    
    this.selectedData['isSelected'] = (e?.target?.innerText === this.selectedData.size &&
                                        this.selectedData.isSelected === true) ?
                                        false : true;
    this.selectedData.size = e?.target?.innerText
    this.selectedData = {...this.selectedData}
    //Copying the object again so that the input is detected in the child component.
    // console.log(this.selectedData);
  }
 priceFormatter():string{
  return Number(this.selectedProduct?.priceRange?.minVariantPrice?.amount).toString()+" INR";
 }

}
