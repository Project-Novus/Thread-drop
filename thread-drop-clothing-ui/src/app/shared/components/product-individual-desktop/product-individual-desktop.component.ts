import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { SelectedSize } from '../../models/sizeModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as ProductSelector from '../../../state/product/product.selectors'
import * as ProductAction from '../../../state/product/product.actions'
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-product-individual-desktop',
  templateUrl: './product-individual-desktop.component.html',
  styleUrls: ['./product-individual-desktop.component.scss']
})
export class ProductIndividualDesktopComponent implements OnInit,OnDestroy {

  productId: string= '';
  sourcePage: string | null | any = null;
  tabOne:boolean = true;
  tabTwo:boolean = false;
  tabThree:boolean = false;
  sizes:string[] = ["M","L","XL","XXL"];
  isSelected:boolean = false;
  selectedData:SelectedSize = {
    size:'M',
    isSelected:true
  };
  productData:any
  selectedProduct: Product | null | any = null;
  productSelecSubscription:Subscription | null = null;
  smallScreen: boolean=false;
  constructor(private route: ActivatedRoute,
              public productStateService: ProductStateService,
              private store:Store<AppState>
            )
            { 
                 this.checkScreenWidth()

               }

  ngOnInit(): void {
    this.checkScreenWidth()
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.sourcePage = this.route.snapshot.queryParamMap.get('from')
    
    if(!this.productSelecSubscription)
      this.getSelectedProductDetails()
    console.log(this.productSelecSubscription);
    
    
  }
  getSelectedProductDetails(){
    this.productSelecSubscription = this.store.select(ProductSelector.selectProductDetails).subscribe(data=>{
      if(data){
        this.selectedProduct = data.productByHandle;
      console.log("Selcted Product");
      
      this.sizes = [...this.getTheAvailableSizes()]
    }else{
        console.log("Selcted Product getting");
        this.store.dispatch(ProductAction.loadProductDetails({productId:this.productId}))
      }
    })
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.productSelecSubscription)
      this.productSelecSubscription.unsubscribe()
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    if(window.innerWidth<970){
      this.smallScreen = true;
    }else{
      this.smallScreen = false;
    }
  }
}
