import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';
import { ProductStateService } from 'src/app/core/services/product-state.service';
import { SelectedSize } from '../../models/sizeModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as ProductSelector from '../../../state/product/product.selectors'
import * as CartActions from '../../../state/cart/cart.action'
import * as CartSelector from '../../../state/cart/cart.selectors'
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
    
  }
  getSelectedProductDetails(){
    this.productSelecSubscription = this.store.select(ProductSelector.selectProductDetails).subscribe(data=>{
      if(data){
        console.log(data.productByHandle);
        
        this.selectedProduct = this.selectedProductFormatter(data.productByHandle)
      console.log("Selcted Product",this.selectedProduct);
      
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

    this.selectedData = {...this.selectedData,size: e?.target?.innerText}
    this.selectedProduct = {
      ...this.selectedProduct,
      productSize: e?.target?.innerText,
      variantId:this.selectedProduct.variants
                .filter((v:any) => v.size === this.selectedData.size)[0].variantId
    }
    //Copying the object again so that the input is detected in the child component.
    console.log(this.selectedProduct);
  }
 priceFormatter(variants:any):string{
    // the amount gets 
    const amount = variants
                 ?.filter(
                  (edge:any)=>(edge?.node?.title.toString() === this.selectedData.size.toString())
                  )[0]?.node?.priceV2?.amount
   
    return amount
    
 }
  getTheAvailableSizes():string[]{
    const sizes= this.selectedProduct?.variants?.
      map((variant:any)=>{
      return variant?.size
    })

    return sizes ? sizes : []
  }
  addToCart(){
    this.selectedProduct = {...this.selectedProduct, productSize:this.selectedData.size}
    console.log("cart loaded",this.selectedProduct);
    const buyerIdentity = {
      customerAccessToken:"23e27abbb38acb5570097ae04586276d",
      email:"Xenolveofficial@gmail.com",
      phone:"6362612241",
      countryCode:"IN"
    }
    this.store.dispatch(CartActions.addToCart({item:[this.selectedProduct],buyerIdentity:buyerIdentity}))
  }

  selectedProductFormatter(productDataFromAPI:any):Product{
    
      const product: Product = {
          id: productDataFromAPI.id,
          title: productDataFromAPI.title,
          description: productDataFromAPI.description,
          handle: productDataFromAPI.handle,
          price:this.priceFormatter(productDataFromAPI.variants.edges),
          // price: productDataFromAPI.priceRange.minVariantPrice.amount, // Assuming you want the minimum price
          productSize: 'M', // Concatenate all variant titles
          images: productDataFromAPI.images.edges.map((edge: any) => ({
              originalSrc: edge.node.originalSrc,
              altText: edge.node.altText || '' // Use empty string if altText is null
          })),
          variants: productDataFromAPI.variants.edges.map((edge:any)=>({
            size:edge.node.title,
            variantId:edge.node.id,
            availableForSale:edge.node.availableForSale,
            price:edge.node.priceV2.amount
          })),
          variantId:productDataFromAPI.variants.edges.
            filter((edge:any)=>edge.node.title === 'M')[0].node.id
      };
  
      return product;
  
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
