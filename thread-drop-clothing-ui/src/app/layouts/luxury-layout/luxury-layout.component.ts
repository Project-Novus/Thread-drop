import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onProductClick(prodId: string): void {
    this.router.navigate([`luxury/${prodId}`], { queryParams: { from: 'luxury' } })
  }
}
