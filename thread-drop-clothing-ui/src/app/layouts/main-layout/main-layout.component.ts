import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { gsap } from 'gsap';
import { TextPlugin,ScrollTrigger } from 'gsap/all';
import { AppState } from 'src/app/state/app.state';
import * as ProductSelector from '../../state/product/product.selectors'
import * as ProductActions from '../../state/product/product.actions'
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit,AfterViewInit,OnDestroy  {
  scroll:boolean = false;
  matchMedia:any;
  @ViewChild('section1',{read:ElementRef}) section1!: ElementRef<HTMLElement>;
  @ViewChild('section2') section2!: ElementRef<HTMLElement>;
  constructor(private store:Store<AppState>) { 
    gsap.registerPlugin(TextPlugin,ScrollTrigger);  
    this.matchMedia=gsap.matchMedia();
  }
  ngAfterViewInit(): void {
  }
  getRatio = (el:any) => window.innerHeight / (window.innerHeight + el.offsetHeight);
  ngOnInit(): void {
    // calling products API
    // this.store.select(ProductSelector.selectProductList).subscribe((a)=>console.log(a));
  
    //Large Screens
 
       this.gsapAnimations()
  } 
  gsapAnimations(){
    gsap.from('.hero-section',{
      scrollTrigger:{
        trigger:".hero-section",
        start:"20% 15%",
        end:"5% 5%",
        
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
 
    gsap.to('#bg',{
      scrollTrigger:{
        scrub:0
      },
      y:'50%'
    })
    gsap.to('#title',{
      scrollTrigger:{
        scrub:0
      },
      y:'300%',
      scale:1.4,
    })

    gsap.from('#signatureImg',{
      scrollTrigger:{
        scrub:1,
        end:"75% center"
      },
      y:'15%',
      opacity:0.5
    })
    gsap.from('#luxuryImg',{
      scrollTrigger:{
        scrub:1,
        end:"75% center"
      },
      y:'15%',
      opacity:0.5
    })  
  }
  ngOnDestroy(): void {
  //  gsap.sc
    
  }
}
