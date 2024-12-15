import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';
import { SelectedSize } from '../../models/sizeModel';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { CartStateService } from 'src/app/core/services/cart-state.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import * as ProductSelector from '../../../state/product/product.selectors'
import * as ProductAction from '../../../state/product/product.actions'
@Component({
  selector: 'app-product-individual-mobile',
  templateUrl: './product-individual-mobile.component.html',
  styleUrls: ['./product-individual-mobile.component.scss']
})
export class ProductIndividualMobileComponent implements OnInit  {

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
  constructor(private route: ActivatedRoute,
              public productStateService: ProductStateService,
              private store:Store<AppState>
            )
               { }

  ngOnInit(): void {
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
      console.log("Selcted Product moi;r");
      
      this.sizes = [...this.getTheAvailableSizes()]
    }else{
        console.log("Selcted Product getting moi;r");
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

  porductVariantMatchForCart():any{
    let selectedVariant  = this.selectedProduct.variants?.edges?.filter((variant:any)=>variant.node.title === this.selectedData.size)[0].node
    selectedVariant = {quantity:1,...selectedVariant}
    return selectedVariant
  }
  addToCart(){
    const shippingAddress = {
        firstName: "John",
          lastName: "Doe",
          address1: "123 Main St",
          address2: null,
          city: "San Francisco",
          province: "California",
          country: "United States",
          zip: "94103"
    };
    const selectedVariant =  this.porductVariantMatchForCart()
    const buyerIdentity = {
      customerAccessToken
      : 
      "caecca8028b472ad48709f6e1f42cc5d",
    countryCode:"IN",
    phone:'7338006388'
      // deliveryAddressPreferences:[
      //   {
      //     customerAddressId:'0543886312660bb7ab29cbd',
      //    deliveryAddress: shippingAddress
      //   }
      // ]
  }
    console.log(selectedVariant);
    // this.cartStateService.createCart(selectedVariant.id, selectedVariant.quantity,buyerIdentity)
    
    
  }
}
