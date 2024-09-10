import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId: string | null = null;
  sourcePage: string | null | any = null;
  tabOne:boolean = true;
  tabTwo:boolean = false;
  tabThree:boolean = false;
  signatureProductData:Product[]=[
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7514.jpg?v=1718954874&width=600',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'2',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7524.jpg?v=1718954983&width=600',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'3',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7489.jpg?v=1718953999&width=600',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'4',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7485.jpg?v=1718954574&width=600',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'5',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26928.jpg?v=1719040800&width=600',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'6',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7696.jpg?v=1725277097&width=246%20246w',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'7',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7489.jpg?v=1718953999&width=600',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'8',
      productImg:'https://bluorng.com/cdn/shop/files/IMG_7696.jpg?v=1725277097&width=246%20246w',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
   
  ]
  luxuryProductData:Product[]=[
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26938.jpg?v=1721028475&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'2',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26940.jpg?v=1721028649&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'3',
      productImg:'https://bluorng.com/cdn/shop/files/mer44.jpg?v=1721471069&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'4',
      productImg:'https://bluorng.com/cdn/shop/files/0-_n.jpg?v=1708246058&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'5',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26938.jpg?v=1721028475&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'6',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26940.jpg?v=1721028649&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'7',
      productImg:'https://bluorng.com/cdn/shop/files/mer44.jpg?v=1721471069&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'8',
      productImg:'https://bluorng.com/cdn/shop/files/0-_n.jpg?v=1708246058&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
   
  ]
  productData: Product | null | any = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.sourcePage = this.route.snapshot.queryParamMap.get('from')
    if(this.sourcePage==='luxury'){
      this.productData = this.luxuryProductData.filter(id=>id.productId===this.productId)[0]
    }else{
      this.productData = this.signatureProductData.filter(id=>id.productId===this.productId)[0]
    }
    console.log(this.productData)
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

}
