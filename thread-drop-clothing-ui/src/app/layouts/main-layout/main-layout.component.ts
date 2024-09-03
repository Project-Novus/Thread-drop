import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin,ScrollTrigger } from 'gsap/all';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit,AfterViewInit  {
  scroll:boolean = false;
  matchMedia:any;
  @ViewChild('section1') section1!: ElementRef<HTMLElement>;
  @ViewChild('section2') section2!: ElementRef<HTMLElement>;
  constructor() { 
    gsap.registerPlugin(TextPlugin,ScrollTrigger);  
    this.matchMedia=gsap.matchMedia();
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    //Large Screens
 
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
        y:'400%',
        // scale:1.7,
      })

      gsap.from('#signatureImg',{
        scrollTrigger:{
          scrub:1,
          end:"75% center"
        },
        y:'40%',
        scale:0.7,
        opacity:0.5
      })
      gsap.from('#luxuryImg',{
        scrollTrigger:{
          scrub:1,
          end:"75% center"
        },
        y:'20%',
        scale:0.6,
        opacity:0.4
      })   
  } 

}
