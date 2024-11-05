import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/productModel';
import { ShopifyService } from 'src/app/core/services/shopify.service';
import { TextPlugin,ScrollTrigger } from 'gsap/all';
import { gsap } from 'gsap';



@Component({
  selector: 'app-signature-layout',
  templateUrl: './signature-layout.component.html',
  styleUrls: ['./signature-layout.component.scss']
})
export class SignatureLayoutComponent implements OnInit {
  scroll: boolean = false;
  option:string='signature';
  matchMedia:any;
  constructor(private router: Router,private shopifyService:ShopifyService) {
    gsap.registerPlugin(ScrollTrigger);  
    this.matchMedia=gsap.matchMedia();

   }
  productData:Product[]=[
    {
      productId:'1',
      productImg:'https://thehouseofrare.com/cdn/shop/files/ZAVET-SRUSTCC07653.png?v=1721042369',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'2',
      productImg:'https://thehouseofrare.com/cdn/shop/files/MIRTILOMAROONCCC_5.jpg?v=1720701895',
      productName:'Jacket for the poor',
      productSegment:'Signature',
      productPrice:'$3000'
    },
    {
      productId:'3',
      productImg:'https://thehouseofrare.com/cdn/shop/files/mirtilo-mens-shirt-navy4_06bb3c34-e72d-42bb-afbc-b3eacef8e816.webp?v=1726744299',
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
    this.matchMedia.add("(min-width: 600px)",()=>{
      this.scrollNavbarChanges("4% 4%","4% 5%")
    })
    this.matchMedia.add("(max-width: 599px)",()=>{
      this.scrollNavbarChanges("1% 1%","1% 4%")
    })

    

    this.shopifyService.getProducts().subscribe((response) => {
      const prod = response.data.products.edges.map((edge: any) => edge.node);
      console.log(prod)
    }, (error) => {
      console.error('Error fetching products:', error);
    });
    this.shopifyService.getProductsByCollection('signature').subscribe((res)=>console.log(res.data.collectionByHandle.products.edges.map((edge: any) => edge.node)))
    this.shopifyService.getProductByHandle('canvas-lunch-bag').subscribe(res => console.log(res))
    this.shopifyService.getAllProducts().subscribe(res => console.log(res))
  }

  scrollNavbarChanges(startingPercentageString: string,endPercentageString: string) {
    
    gsap.from('.hero-section',{
      scrollTrigger:{
        trigger:".hero-section",
        start:`${startingPercentageString}`,
        end:`${endPercentageString}`,
        
        // markers:true,
        onEnterBack:()=>{
          
          this.scroll = false;
          console.log("scrolled Back",this.scroll);
          
        },
        // markers:true,
        onUpdate:()=>{
          this.scroll=true;
          console.log("scrolled",this.scroll);
          
        }
      }
    })

    return ()=>{}
  }
  onProductClick(prodId: string): void {
    this.router.navigate([`signature/${prodId}`], { queryParams: { from: 'signature' } })
  }
}
