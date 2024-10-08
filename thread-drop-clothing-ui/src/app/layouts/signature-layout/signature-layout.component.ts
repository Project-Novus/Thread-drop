import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';

@Component({
  selector: 'app-signature-layout',
  templateUrl: './signature-layout.component.html',
  styleUrls: ['./signature-layout.component.scss']
})
export class SignatureLayoutComponent implements OnInit {
  option:string='signature';
  constructor(private router: Router) { }
  productData:Product[]=[
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
  ngOnInit(): void {
  }

  onProductClick(prodId: string): void {
    this.router.navigate([`signature/${prodId}`], { queryParams: { from: 'signature' } })
  }
}
