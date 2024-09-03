import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnChanges {
  @Input() scroll: boolean = false;
  @Input() option:string = '';
  @ViewChild('underline') underline!:ElementRef<HTMLElement>
  @ViewChild('underline2') underline2!:ElementRef<HTMLElement>
  @ViewChild('underline3') underline3!:ElementRef<HTMLElement>
  @ViewChild('underline4') underline4!:ElementRef<HTMLElement>
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.scroll)
    if(this.scroll){
      this.addBlackRemoveWhite()
      gsap.to(".nav",{
        color:"black",
        background:"white",
        duration:0.3,
        // fontWeight:"bold"
      })
    }else{
      this.addWhiteRemoveBlack()
      gsap.to(".nav",{
        color:"white",
        background:"transparent",
        duration:0.3,
      })
    }
  }

  ngOnInit(): void {
  }
  addBlackRemoveWhite(){
      this.underline.nativeElement.classList.remove("nav-underline-white")
      this.underline2.nativeElement.classList.remove("nav-underline-white")
      this.underline3.nativeElement.classList.remove("nav-underline-white")
      this.underline4.nativeElement.classList.remove("nav-underline-white")
      this.underline.nativeElement.classList.add("nav-underline-black")
      this.underline2.nativeElement.classList.add("nav-underline-black")
      this.underline3.nativeElement.classList.add("nav-underline-black")
      this.underline4.nativeElement.classList.add("nav-underline-black")
  }
  addWhiteRemoveBlack(){
    this.underline.nativeElement.classList.remove("nav-underline-black")
    this.underline2.nativeElement.classList.remove("nav-underline-black")
    this.underline3.nativeElement.classList.remove("nav-underline-black")
    this.underline4.nativeElement.classList.remove("nav-underline-black")
    this.underline.nativeElement.classList.add("nav-underline-white")
    this.underline2.nativeElement.classList.add("nav-underline-white")
    this.underline3.nativeElement.classList.add("nav-underline-white")
    this.underline4.nativeElement.classList.add("nav-underline-white")
  }
}
