import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { SelectedSize } from '../../models/sizeModel';

@Component({
  selector: 'app-product-individual-desktop',
  templateUrl: './product-individual-desktop.component.html',
  styleUrls: ['./product-individual-desktop.component.scss']
})
export class ProductIndividualDesktopComponent implements OnInit {

  productId: string= '';
  sourcePage: string | null | any = null;
  tabOne:boolean = true;
  tabTwo:boolean = false;
  tabThree:boolean = false;
  sizes:string[] = ["S","M","L","XL","XXL"];
  isSelected:boolean = false;
  selectedData:SelectedSize = {
    size:'S',
    isSelected:true
  };
  productData:any
  selectedProduct: Product | null | any = null;
  constructor(private route: ActivatedRoute,
              public productStateService: ProductStateService)
               { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.sourcePage = this.route.snapshot.queryParamMap.get('from')
    this.productStateService.clearSelectedProduct();
    this.productStateService.loadProductById(this.productId)
    this.productStateService.selectedProduct$
                .subscribe(
                  data => {
                    this.selectedProduct = data;
                    console.log(data);
                    this.sizes = [...this.getTheAvailableSizes()]
                  }
                );
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
 priceFormatter():number{
    // the amount gets 
    const amount = this.selectedProduct?.variants?.edges
                 ?.filter((edge:any)=>{
                 return edge?.node?.title.toString() === this.selectedData.size.toString() 
                 })[0]?.node?.priceV2?.amount
   
    return Number(amount)
    
 }
  getTheAvailableSizes():string[]{
    const sizes= this.selectedProduct?.variants?.edges
    ?.map((edge:any)=>{
      return edge?.node?.title.toString()
    })

    return sizes ? sizes : []
  }

}
