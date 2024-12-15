import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShopifyService } from './core/services/shopify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'THREAD DROP';
  isSplashVisible = true;
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
  userInteracted: boolean =false;
  constructor(private router:Router, private shopifyService:ShopifyService){}
  ngOnInit(): void {
    // this.createCustomer()
    // this.loginCustomer()
    // this.recoverPassword()
    this.showSplashScreen();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  showSplashScreen() {
    const splashDisplayed = localStorage.getItem('splashDisplayed');
    
    if (!splashDisplayed) {
      // Display the splash screen for 3 seconds before animating
      setTimeout(() => {
        document.querySelector('.splash-screen')?.classList.add('splash-exit'); // Trigger the animation

        // Wait for the animation to finish before hiding the splash
        setTimeout(() => {
          this.isSplashVisible = false;
          localStorage.setItem('splashDisplayed', 'true');
        }, 1000); // This should match the animation duration
      }, 1500); // Keep the splash screen visible for 3 seconds before starting the animation
    } else {
      this.isSplashVisible = false;
    }
  }

  createCustomer(){
    const input = {
      firstName: "Faizan",
      lastName: "Shariff",
      email: "mrfaizanshariff@gmail.com",
      password: "PLAYstation3"
    };
    this.shopifyService.createCustomer(input).subscribe((response:any) => {
      console.log(response,"Customer created");
      
    })
  }
  loginCustomer(){
    this.shopifyService.customerLogin('mrfaizanshariff@gmail.com','PLAYstation3')
    .subscribe((response:any) =>{console.log(response,"Customer authenticated");
    this.shopifyService
    .getCustomerData(response
                    .data
                    .customerAccessTokenCreate
                    .customerAccessToken
                    .accessToken)
                    .subscribe((response:any) =>{console.log(response,"customer data")})
    })
  }
  recoverPassword(){
    this.shopifyService.recoverCustomerPassword('faizantherooster@gmail.com').subscribe((res)=>{

      console.log(res);
      
    })
  }

  // @ViewChild('videoPlayer') videoPlayer!: ElementRef;
   @ViewChild('textElement') textElement!: ElementRef; 
  //  ngAfterViewInit() { this.videoPlayer.nativeElement.play(); }
   showText() { this.textElement.nativeElement.style.display = 'block'; }




   onVideoLoaded(event: Event): void {
    const video = this.backgroundVideo.nativeElement;
    
    
    // If the user has interacted with the page, play the video
    if (this.userInteracted) {
      video.play().catch((err: any) => console.log('Play failed:', err));
     
    }
  }

  // Monitor video playback to loop between specific times
  

  // Listen for user interaction to trigger the video play
  @HostListener('window:click') onUserInteraction() {
    this.playVideo();
  }
  @HostListener('window:scroll') onUserScroll() {
    this.playVideo();
  }

  // Play video only after user interaction
  playVideo(): void {
    const video = this.backgroundVideo.nativeElement;
    this.userInteracted = true; // User has interacted with the page
    this.textElement.nativeElement.style.display = 'none';
    // Attempt to play the video once user interaction is detected
    if (video.paused) {
      video.play().catch((err: any) => console.log('Play failed:', err));
    }
  }
}


