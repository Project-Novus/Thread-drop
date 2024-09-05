import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/productModel';

@Component({
  selector: 'app-luxury-layout',
  templateUrl: './luxury-layout.component.html',
  styleUrls: ['./luxury-layout.component.scss']
})
export class LuxuryLayoutComponent implements OnInit {
  option:string="luxury"
  productData:Product[]=[
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26938.jpg?v=1721028475&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26940.jpg?v=1721028649&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/mer44.jpg?v=1721471069&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/0-_n.jpg?v=1708246058&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26938.jpg?v=1721028475&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/Untitled_Artwork_26940.jpg?v=1721028649&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/mer44.jpg?v=1721471069&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
    {
      productId:'1',
      productImg:'https://bluorng.com/cdn/shop/files/0-_n.jpg?v=1708246058&width=600',
      productName:'Tshirt for the Rich',
      productSegment:'Luxury',
      productPrice:'$8999'
    },
   
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
