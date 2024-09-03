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
  @ViewChild('section1',{read:ElementRef}) section1!: ElementRef<HTMLElement>;
  @ViewChild('section2') section2!: ElementRef<HTMLElement>;
  constructor() { 
    gsap.registerPlugin(TextPlugin,ScrollTrigger);  
    this.matchMedia=gsap.matchMedia();
  }
  ngAfterViewInit(): void {
    gsap.fromTo('#bg',{
      backgroundPosition: () => `50% ${-window.innerHeight * this.getRatio(this.section1.nativeElement)}px` 
    }, {
      backgroundPosition: () => `50% ${window.innerHeight * (1 - this.getRatio(this.section1.nativeElement))}px`,
      ease: "none",
      scrollTrigger: {
        trigger: this.section1.nativeElement,
        start: () => "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true // to make it responsive
      }
    })
  }
  getRatio = (el:any) => window.innerHeight / (window.innerHeight + el.offsetHeight);
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
